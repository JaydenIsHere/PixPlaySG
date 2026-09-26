// Verifies a Payhip license key server-side, so the product secret key
// (set as the PAYHIP_PRODUCT_SECRET_KEY environment variable in Netlify's
// dashboard) never reaches the browser.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let licenseKey;
  try {
    ({ licenseKey } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!licenseKey || typeof licenseKey !== 'string') {
    return { statusCode: 400, body: JSON.stringify({ error: 'License key is required' }) };
  }

  const productSecretKey = process.env.PAYHIP_PRODUCT_SECRET_KEY;
  if (!productSecretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server is not configured' }) };
  }

  try {
    const response = await fetch(
      `https://payhip.com/api/v2/license/verify?license_key=${encodeURIComponent(licenseKey.trim())}`,
      { headers: { 'product-secret-key': productSecretKey } }
    );

    if (!response.ok) {
      return { statusCode: 401, body: JSON.stringify({ valid: false }) };
    }

    const result = await response.json();
    const data = result?.data;

    if (!data || data.enabled === false) {
      return { statusCode: 401, body: JSON.stringify({ valid: false }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, buyerEmail: data.buyer_email }),
    };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'Could not reach Payhip' }) };
  }
};
