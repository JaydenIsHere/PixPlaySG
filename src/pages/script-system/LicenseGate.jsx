import { useEffect, useState } from 'react';

const UNLOCK_KEY = 'ss_unlocked';

export default function LicenseGate({ bypass, onUnlock, children }) {
  const [unlocked, setUnlocked] = useState(Boolean(bypass));
  const [key, setKey] = useState('');
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (bypass) return;
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === 'true') setUnlocked(true);
    } catch {
      // sessionStorage unavailable — buyer just re-enters their key
    }
  }, [bypass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim() || checking) return;
    setChecking(true);
    setErrorMsg('');
    try {
      const res = await fetch('/.netlify/functions/verify-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: key.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, 'true');
        } catch {
          // fine if it can't persist — this tab session still stays unlocked
        }
        onUnlock?.(data.buyerEmail);
        setUnlocked(true);
      } else if (res.status === 401) {
        // A real rejection from Payhip — the key itself is wrong or disabled.
        setErrorMsg("That key didn't work. Double-check it and try again.");
      } else {
        // A config/network problem on our end (e.g. missing secret key) —
        // never tell the buyer their key is wrong when it might be our fault.
        setErrorMsg('Something went wrong on our end. Please try again shortly, or contact support if it keeps happening.');
      }
    } catch {
      setErrorMsg('Could not verify right now. Please try again in a moment.');
    } finally {
      setChecking(false);
    }
  };

  if (unlocked) return children;

  return (
    <div className="ss-gate">
      <div className="ss-gate-card">
        <h1>Strategic Script System</h1>
        <p>Enter the license key from your purchase email to unlock your access.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. WTKP4-66NL5-HMKQW-GFSCZ"
            autoFocus
          />
          <button className="ss-btn" type="submit" disabled={checking}>
            {checking ? 'Checking...' : 'Unlock'}
          </button>
        </form>
        {errorMsg && <p className="ss-gate-error">{errorMsg}</p>}
      </div>
    </div>
  );
}
