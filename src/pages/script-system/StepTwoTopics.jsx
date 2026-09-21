import { useState } from 'react';
import { useLocalState } from './useLocalState';
import Grid9 from './Grid9';
import { BUSINESS_TYPES } from '../../data/scriptSystemData';
import {
  DEFAULT_IDENTITY,
  buildTopicGenerationPrompt,
  exportGridsAsPNG,
} from '../../utils/scriptSystemUtils';

const EMPTY_GRID = Array(8).fill('');

export default function StepTwoTopics({ onNext }) {
  const [identity] = useLocalState('ss_identity', DEFAULT_IDENTITY);
  const [businessType, setBusinessType] = useLocalState('ss_businessType', 'service');
  const [terminology, setTerminology] = useLocalState('ss_terminology', EMPTY_GRID);
  const [audience, setAudience] = useLocalState('ss_audience', EMPTY_GRID);
  const [hasTopic, setHasTopic] = useLocalState('ss_hasTopic', null);
  const [topic, setTopic] = useLocalState('ss_topic', '');
  const [copied, setCopied] = useState(false);

  const prompt = buildTopicGenerationPrompt({ identity, terminology, audience, businessTypeKey: businessType });

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = () => {
    exportGridsAsPNG({ terminology, audience, businessName: identity.business });
  };

  return (
    <div className="ss-step">
      <h2>Step 2 — Get Your Topic</h2>
      <p className="ss-step-intro">Do you already have a topic you want to film?</p>

      <div className="ss-stage-toggle ss-yesno-toggle">
        <button
          type="button"
          className={hasTopic === true ? 'active' : ''}
          onClick={() => setHasTopic(true)}
        >
          Yes, I have it
        </button>
        <button
          type="button"
          className={hasTopic === false ? 'active' : ''}
          onClick={() => setHasTopic(false)}
        >
          No, help me generate one
        </button>
      </div>

      {hasTopic === true && (
        <div className="ss-field ss-big-topic">
          <label className="ss-topic-label">Your topic</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Type or paste your topic here"
            rows={3}
          />
        </div>
      )}

      {hasTopic === false && (
        <>
          <p className="ss-step-intro">
            Fill in both grids below, then export them and run the prompt in your own AI tool
            (ChatGPT, Gemini, Claude — whichever you use) to get your 64 topics. Once you&apos;ve
            picked one, come back and paste it into the box below.
          </p>

          <div className="ss-field">
            <label>What type of business is this?</label>
            <select value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
              {Object.entries(BUSINESS_TYPES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
            <p className="ss-hint">
              Content ratio: TOFU {BUSINESS_TYPES[businessType].ratio.TOFU}% / MOFU{' '}
              {BUSINESS_TYPES[businessType].ratio.MOFU}% / BOFU {BUSINESS_TYPES[businessType].ratio.BOFU}%
            </p>
          </div>

          <div className="ss-grid-stack">
            <Grid9
              title="Grid 1 — Industry Terminology"
              centerLabel={identity.business || 'Your business'}
              values={terminology}
              onChange={setTerminology}
              placeholderPrefix="Term"
            />
            <Grid9
              title="Grid 2 — Target Customer Types"
              centerLabel={identity.business || 'Your business'}
              values={audience}
              onChange={setAudience}
              placeholderPrefix="Audience"
            />
          </div>

          <div className="ss-export-row">
            <button className="ss-btn" onClick={handleCopy} type="button">
              {copied ? 'Copied!' : 'Copy prompt as text'}
            </button>
            <button className="ss-btn ss-btn-outline" onClick={handleDownloadPNG} type="button">
              Download grids as PNG
            </button>
          </div>

          <div className="ss-field ss-big-topic">
            <label className="ss-topic-label">Now paste the topic you picked</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Paste the one topic you want to build a script for"
              rows={3}
            />
          </div>
        </>
      )}

      {hasTopic !== null && (
        <button className="ss-btn ss-btn-next" onClick={onNext} type="button">
          Next: Build Your Script →
        </button>
      )}
    </div>
  );
}
