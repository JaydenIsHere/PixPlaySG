import { useLocalState } from './useLocalState';
import { DEFAULT_IDENTITY, toYouTubeEmbedUrl } from '../../utils/scriptSystemUtils';
import { TUTORIAL_VIDEO_URL } from '../../data/scriptSystemData';

export default function StepOneIdentity({ onNext }) {
  const [form, setForm] = useLocalState('ss_identity', DEFAULT_IDENTITY);
  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="ss-step">
      <h2>Step 1 — Brand &amp; Audience Foundation</h2>

      <div className="ss-video-wrap">
        {TUTORIAL_VIDEO_URL ? (
          <iframe
            src={toYouTubeEmbedUrl(TUTORIAL_VIDEO_URL)}
            title="How to use the Strategic Script System"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="ss-video-placeholder">
            <span>🎬 Intro &amp; walkthrough video coming soon</span>
          </div>
        )}
      </div>

      <p className="ss-step-intro">
        Fill this in once. It&apos;s saved automatically in this browser — come back anytime and
        it&apos;ll still be here — and it&apos;s reused behind the scenes in every prompt from here on,
        so everything you generate keeps sounding like you.
      </p>

      <div className="ss-field">
        <label>What&apos;s your business or niche?</label>
        <input
          type="text"
          value={form.business}
          onChange={handleChange('business')}
          placeholder="e.g. Financial planning for independent professionals"
        />
      </div>
      <div className="ss-field">
        <label>Who is your target audience?</label>
        <input
          type="text"
          value={form.audience}
          onChange={handleChange('audience')}
          placeholder="e.g. DINK couples in their 30s-40s planning for retirement"
        />
      </div>
      <div className="ss-field">
        <label>What&apos;s the core promise or transformation you deliver?</label>
        <input
          type="text"
          value={form.promise}
          onChange={handleChange('promise')}
          placeholder="e.g. Retire without relying on your kids or the government"
        />
      </div>
      <div className="ss-field">
        <label>What&apos;s your tone of voice?</label>
        <input
          type="text"
          value={form.tone}
          onChange={handleChange('tone')}
          placeholder="e.g. warm, direct, no jargon"
        />
      </div>

      <button className="ss-btn ss-btn-next" onClick={onNext} type="button">
        Next: Generate Your Topics →
      </button>
    </div>
  );
}
