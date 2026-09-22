import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LicenseGate from './LicenseGate';
import StepOneIdentity from './StepOneIdentity';
import StepTwoTopics from './StepTwoTopics';
import StepThreeGenerator from './StepThreeGenerator';
import BonusCalendar from './BonusCalendar';
import './scriptSystem.css';

const TABS = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
  { id: 4, label: 'Bonus' },
];

export default function ScriptSystemAccess() {
  const [searchParams] = useSearchParams();
  // ?name=... is an owner-only preview bypass (for your own QA/screenshots) —
  // real buyers unlock with their Payhip license key instead.
  const previewName = searchParams.get('name');
  const [activeTab, setActiveTab] = useState(1);
  const [buyerEmail, setBuyerEmail] = useState(null);
  const watermarkLabel = previewName || buyerEmail;

  // Scrolling here (after the new tab's content has actually mounted) instead of
  // inside the click handler avoids landing mid-page when the new step is a
  // different height than the one being left.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="ss-page">
      <LicenseGate bypass={Boolean(previewName)} onUnlock={setBuyerEmail}>
        {watermarkLabel && (
          <div className="ss-watermark">
            Prepared for {watermarkLabel} — licensed for personal use only. Please don&apos;t
            share this link.
          </div>
        )}

        <div className="ss-container">
          <header className="ss-header">
            <h1>Strategic Script System</h1>
            <p>Your reusable, targeted prompt system for short-form video scripts.</p>
          </header>

          <nav className="ss-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={activeTab === t.id ? 'active' : ''}
                onClick={() => setActiveTab(t.id)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="ss-content">
            {activeTab === 1 && <StepOneIdentity onNext={() => setActiveTab(2)} />}
            {activeTab === 2 && <StepTwoTopics onNext={() => setActiveTab(3)} />}
            {activeTab === 3 && <StepThreeGenerator onNext={() => setActiveTab(4)} />}
            {activeTab === 4 && <BonusCalendar />}
          </div>

          <footer className="ss-footer">
            This page is for your personal use only. Please don&apos;t share this link publicly.
          </footer>
        </div>
      </LicenseGate>
    </div>
  );
}
