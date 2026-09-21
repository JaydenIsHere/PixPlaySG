import { useEffect, useMemo, useState } from 'react';
import { useLocalState } from './useLocalState';
import {
  STAGES,
  STAGE_INFO,
  TOFU_FORMATS,
  TOFU_ANGLES,
  HOOK_OPTIONS,
  FRAMEWORKS,
  CTAS,
} from '../../data/scriptSystemData';
import { DEFAULT_IDENTITY, buildIdentityBlock } from '../../utils/scriptSystemUtils';

function getFieldsForStage(stage) {
  if (stage === 'TOFU') {
    return [
      { key: 'format', label: 'Format' },
      { key: 'hook', label: 'Hook / Angle' },
      { key: 'cta', label: 'CTA' },
    ];
  }
  return [
    { key: 'hook', label: 'Hook' },
    { key: 'framework', label: 'Main script framework' },
    { key: 'cta', label: 'CTA' },
  ];
}

function getFieldOptions(key, stage) {
  if (key === 'format') return TOFU_FORMATS;
  if (key === 'hook') {
    if (stage === 'TOFU') {
      return TOFU_ANGLES.map((a) => ({ name: a.name, desc: a.desc, example: a.example }));
    }
    return HOOK_OPTIONS;
  }
  if (key === 'framework') return FRAMEWORKS[stage];
  if (key === 'cta') return CTAS[stage].map((c) => ({ name: c }));
  return [];
}

export default function StepThreeGenerator({ onNext }) {
  const [identity] = useLocalState('ss_identity', DEFAULT_IDENTITY);
  const [topic, setTopic] = useLocalState('ss_topic', '');
  const [stage, setStage] = useState('MOFU');
  const fields = useMemo(() => getFieldsForStage(stage), [stage]);
  const [selection, setSelection] = useState({ format: 0, hook: 0, framework: 0, cta: 0 });
  const [activeField, setActiveField] = useState(fields[0].key);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const isPsychologyHook = activeField === 'hook' && stage !== 'TOFU';

  useEffect(() => {
    const freshFields = getFieldsForStage(stage);
    setSelection({ format: 0, hook: 0, framework: 0, cta: 0 });
    setActiveField(freshFields[0].key);
    setSearch('');
  }, [stage]);

  const activeOptions = useMemo(() => getFieldOptions(activeField, stage), [activeField, stage]);
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return activeOptions.map((opt, i) => ({ ...opt, i }));
    const q = search.toLowerCase();
    return activeOptions
      .map((opt, i) => ({ ...opt, i }))
      .filter((opt) => {
        if (isPsychologyHook) {
          return (
            opt.principle.name.toLowerCase().includes(q) ||
            opt.principle.psychology.toLowerCase().includes(q) ||
            opt.example.toLowerCase().includes(q)
          );
        }
        return opt.name.toLowerCase().includes(q) || (opt.desc || '').toLowerCase().includes(q);
      });
  }, [activeOptions, search, isPsychologyHook]);

  // Group the filtered flat hook list back into per-principle sections for display.
  const groupedHookOptions = useMemo(() => {
    if (!isPsychologyHook) return null;
    const groups = [];
    filteredOptions.forEach((opt) => {
      const last = groups[groups.length - 1];
      if (last && last.principleIdx === opt.principleIdx) {
        last.items.push(opt);
      } else {
        groups.push({ principleIdx: opt.principleIdx, principle: opt.principle, items: [opt] });
      }
    });
    return groups;
  }, [filteredOptions, isPsychologyHook]);

  const handlePick = (i) => {
    setSelection((prev) => ({ ...prev, [activeField]: i }));
    const currentIdx = fields.findIndex((f) => f.key === activeField);
    const next = fields[currentIdx + 1];
    if (next) {
      setActiveField(next.key);
      setSearch('');
    }
  };

  const pickedFor = (key) => getFieldOptions(key, stage)[selection[key]] || getFieldOptions(key, stage)[0];
  const hook = pickedFor('hook');
  const cta = pickedFor('cta');
  const format = stage === 'TOFU' ? pickedFor('format') : null;
  const framework = stage !== 'TOFU' ? pickedFor('framework') : null;
  const hookName = stage === 'TOFU' ? hook.name : hook.principle.name;

  // The example lines shown in the picker are illustrations of the strategy for the
  // user's own understanding — they're not written for this buyer's business, so the
  // final prompt describes the *strategy* instead of injecting that unrelated (and,
  // for TOFU angles, placeholder-templated) example text.
  const hookStrategyLine =
    stage === 'TOFU'
      ? `Angle: ${hookName} — ${hook.desc}`
      : `Hook strategy (${hookName}): ${hook.principle.psychology} ${hook.principle.application}`;

  const prompt =
    stage === 'TOFU'
      ? `Using the following brand identity, write short-form content.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: TOFU — ${STAGE_INFO.TOFU.desc}
Format: ${format.name}
${hookStrategyLine}
Call to action: "${cta.name}"

${format.writingInstruction} Match the tone of voice above.`
      : `Using the following brand identity, write a short-form video script.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: ${stage} — ${STAGE_INFO[stage].desc}
${hookStrategyLine}
Script framework: ${framework.name} — ${framework.desc}
Call to action: "${cta.name}"

Write the full script (hook, body, CTA) in a natural spoken style that matches the tone of voice above. Keep it tight enough for a 30-60 second short-form video.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentValueFor = (key) => {
    if (key === 'format') return format.name;
    if (key === 'framework') return framework.name;
    if (key === 'cta') return cta.name;
    if (key === 'hook') return hookName;
    return '';
  };

  return (
    <div className="ss-step">
      <h2>Step 3 — Script Cards</h2>

      <div className="ss-field ss-big-topic">
        <label className="ss-topic-label">Your topic</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type or paste a topic — switch it anytime without leaving this step"
          rows={2}
        />
      </div>

      <div className="ss-field">
        <label>Content stage</label>
        <div className="ss-stage-toggle">
          {STAGES.map((s) => (
            <button
              key={s}
              className={s === stage ? 'active' : ''}
              onClick={() => setStage(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="ss-hint">{STAGE_INFO[stage].desc}</p>
      </div>

      <div className="ss-info-box">
        <strong>{STAGE_INFO[stage].infoTitle}</strong>
        <ul>
          {STAGE_INFO[stage].points.map((p) => (
            <li key={p.name}>
              <strong>{p.name}:</strong> {p.desc}
            </li>
          ))}
        </ul>
      </div>

      <div className="ss-two-col">
        <div className="ss-col-left">
          {fields.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`ss-field-row ${activeField === f.key ? 'active' : ''}`}
              onClick={() => {
                setActiveField(f.key);
                setSearch('');
              }}
            >
              <span className="ss-field-row-label">{f.label}</span>
              <span className="ss-field-row-value">{currentValueFor(f.key)}</span>
            </button>
          ))}
        </div>

        <div className="ss-col-right">
          <input
            type="text"
            className="ss-search"
            placeholder={`Search ${fields.find((f) => f.key === activeField)?.label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ss-option-list">
            {isPsychologyHook &&
              groupedHookOptions.map((group) => (
                <div key={group.principleIdx} className="ss-option-group">
                  <div className="ss-option-divider">
                    <span className="ss-option-divider-name">
                      {group.principle.name}
                      {group.principle.subtitle ? ` (${group.principle.subtitle})` : ''}
                    </span>
                    <span className="ss-option-divider-blurb">{group.principle.psychology}</span>
                  </div>
                  {group.items.map((opt) => (
                    <button
                      key={`${opt.principleIdx}-${opt.exampleIdx}`}
                      type="button"
                      className={`ss-option ss-option-hook ${selection.hook === opt.i ? 'selected' : ''}`}
                      onClick={() => handlePick(opt.i)}
                    >
                      &quot;{opt.example}&quot;
                    </button>
                  ))}
                </div>
              ))}

            {!isPsychologyHook &&
              filteredOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  className={`ss-option ${selection[activeField] === opt.i ? 'selected' : ''}`}
                  onClick={() => handlePick(opt.i)}
                >
                  <span className="ss-option-name">{opt.name}</span>
                  {opt.desc && <span className="ss-option-desc">{opt.desc}</span>}
                  {opt.example && <span className="ss-option-example">&quot;{opt.example}&quot;</span>}
                </button>
              ))}

            {filteredOptions.length === 0 && <p className="ss-hint">No matches.</p>}
          </div>
        </div>
      </div>

      <div className="ss-output">
        <div className="ss-output-header">
          <span>Your final AI prompt</span>
          <button className="ss-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre>{prompt}</pre>
      </div>

      <button className="ss-btn ss-btn-next" onClick={onNext} type="button">
        Next: Bonus Calendar →
      </button>
    </div>
  );
}
