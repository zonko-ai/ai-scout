const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getDeploymentUrl() {
  const rawUrl = "https://first-chickadee-105.eu-west-1.convex.site"

  if (!rawUrl) {
    return { error: 'Missing CONVEX_DEPLOYMENT_URL environment variable.' };
  }

  try {
    const url = new URL(rawUrl);
    return { value: url.toString().replace(/\/$/, '') };
  } catch (error) {
    return { error: 'CONVEX_DEPLOYMENT_URL must be a valid URL.' };
  }
}

function getEmailFromBody(body) {
  if (!body) return '';
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed.email === 'string' ? parsed.email.trim() : '';
    } catch (error) {
      return '';
    }
  }

  return typeof body.email === 'string' ? body.email.trim() : '';
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const deployment = getDeploymentUrl();
  if (deployment.error) {
    res.status(500).json({ error: deployment.error });
    return;
  }

  const email = getEmailFromBody(req.body);
  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  try {
    const upstreamResponse = await fetch(`${deployment.value}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout
        ? AbortSignal.timeout(10000)
        : undefined,
    });

    const text = await upstreamResponse.text();
    let payload;

    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (error) {
        payload = { message: text };
      }
    } else {
      payload = { ok: upstreamResponse.ok };
    }

    if (!upstreamResponse.ok) {
      res.status(upstreamResponse.status).json({
        error: payload.error || payload.message || 'Upstream waitlist request failed.',
      });
      return;
    }

    res.status(200).json(payload);
  } catch (error) {
    const timedOut = error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    res.status(502).json({
      error: timedOut
        ? 'The waitlist service timed out. Please try again.'
        : 'Could not reach the waitlist service.',
    });
  }
};
