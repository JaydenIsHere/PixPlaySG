import { useEffect, useMemo, useState } from 'react';
import { useLocalState } from './useLocalState';
import {
  STAGES,
  STAGE_INFO,
  BUSINESS_TYPES,
  TOFU_FORMATS,
  TOFU_ANGLES,
  getHookOptions,
  FRAMEWORKS,
  CTAS,
} from '../../data/scriptSystemData';
import {
  DEFAULT_IDENTITY,
  buildHookStrategyLine,
  buildScriptPrompt,
  buildCustomLibraryExport,
  mergeCustomLibrary,
  downloadTextFile,
  readTextFile,
} from '../../utils/scriptSystemUtils';

const EMPTY_ADD_FORM = { name: '', subtitle: '', desc: '', psychology: '', application: '', example: '' };

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

function getFieldOptions(key, stage, businessType, customs) {
  if (key === 'format') return TOFU_FORMATS;
  if (key === 'hook') {
    if (stage === 'TOFU') {
      return [...TOFU_ANGLES, ...customs.angles].map((a) => ({
        name: a.name,
        desc: a.desc,
        example: a.example,
        isCustom: a.isCustom,
      }));
    }
    return getHookOptions(businessType, customs.hooks);
  }
  if (key === 'framework') return [...FRAMEWORKS[stage], ...(customs.frameworks[stage] || [])];
  if (key === 'cta') return CTAS[stage].map((c) => ({ name: c }));
  return [];
}

export default function StepThreeGenerator({ onNext }) {
  const [identity] = useLocalState('ss_identity', DEFAULT_IDENTITY);
  const [topic, setTopic] = useLocalState('ss_topic', '');
  const [businessType] = useLocalState('ss_businessType', 'service');
  const [stage, setStage] = useState('TOFU');
  const fields = useMemo(() => getFieldsForStage(stage), [stage]);
  const [selection, setSelection] = useState({ format: 0, hook: 0, framework: 0, cta: 0 });
  const [activeField, setActiveField] = useState(fields[0].key);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [ctaConfirmed, setCtaConfirmed] = useState(false);
  const [customAngles, setCustomAngles] = useLocalState('ss_custom_angles', []);
  const [customHooks, setCustomHooks] = useLocalState('ss_custom_hooks', []);
  const [customFrameworks, setCustomFrameworks] = useLocalState('ss_custom_frameworks', {
    MOFU: [],
    BOFU: [],
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_ADD_FORM);
  const [importError, setImportError] = useState('');
  const customs = { angles: customAngles, hooks: customHooks, frameworks: customFrameworks };

  const isPsychologyHook = activeField === 'hook' && stage !== 'TOFU';

  const changeActiveField = (key) => {
    setActiveField(key);
    setSearch('');
    setShowAddForm(false);
    setAddForm(EMPTY_ADD_FORM);
  };

  useEffect(() => {
    const freshFields = getFieldsForStage(stage);
    setSelection({ format: 0, hook: 0, framework: 0, cta: 0 });
    setActiveField(freshFields[0].key);
    setSearch('');
    setCtaConfirmed(false);
    setShowAddForm(false);
    setAddForm(EMPTY_ADD_FORM);
  }, [stage, businessType]);

  const activeOptions = useMemo(
    () => getFieldOptions(activeField, stage, businessType, customs),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- customs is rebuilt from these same fields every render
    [activeField, stage, businessType, customAngles, customHooks, customFrameworks]
  );
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return activeOptions.map((opt, i) => ({ ...opt, i }));
    const q = search.toLowerCase();
    return activeOptions
      .map((opt, i) => ({ ...opt, i }))
      .filter((opt) => {
        if (isPsychologyHook) {
          return (
            opt.principle.name.toLowerCase().includes(q) ||
            (opt.principle.part || '').toLowerCase().includes(q) ||
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
    if (activeField === 'cta') setCtaConfirmed(true);
    const currentIdx = fields.findIndex((f) => f.key === activeField);
    const next = fields[currentIdx + 1];
    if (next) changeActiveField(next.key);
  };

  const pickedFor = (key) =>
    getFieldOptions(key, stage, businessType, customs)[selection[key]] ||
    getFieldOptions(key, stage, businessType, customs)[0];
  const hook = pickedFor('hook');
  const cta = pickedFor('cta');
  const format = stage === 'TOFU' ? pickedFor('format') : null;
  const framework = stage !== 'TOFU' ? pickedFor('framework') : null;
  const hookName = stage === 'TOFU' ? hook.name : hook.principle.name;

  const hookStrategyLine = buildHookStrategyLine({
    stage,
    hookName,
    hookDesc: hook.desc,
    hookPsychology: hook.principle?.psychology,
    hookApplication: hook.principle?.application,
  });

  const prompt = buildScriptPrompt({
    identity,
    topic,
    stage,
    hookStrategyLine,
    format,
    framework,
    ctaText: cta.name,
  });

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

  const handleRestart = () => {
    if (!window.confirm('Clear your selections in Step 3 and start over?')) return;
    setStage('TOFU');
    setSelection({ format: 0, hook: 0, framework: 0, cta: 0 });
    setActiveField(getFieldsForStage('TOFU')[0].key);
    setSearch('');
    setCtaConfirmed(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  const handleAddCustom = () => {
    const name = addForm.name.trim();
    if (!name) return;

    if (activeField === 'hook' && stage === 'TOFU') {
      if (customAngles.some((a) => a.name.toLowerCase() === name.toLowerCase())) {
        window.alert('You already have a custom hook with that name.');
        return;
      }
      setCustomAngles((prev) => [
        ...prev,
        { name, desc: addForm.desc.trim(), example: addForm.example.trim(), isCustom: true },
      ]);
    } else if (activeField === 'hook') {
      if (customHooks.some((h) => h.name.toLowerCase() === name.toLowerCase())) {
        window.alert('You already have a custom hook with that name.');
        return;
      }
      setCustomHooks((prev) => [
        ...prev,
        {
          name,
          subtitle: addForm.subtitle.trim(),
          businessType: 'universal',
          psychology: addForm.psychology.trim(),
          application: addForm.application.trim(),
          examples: [addForm.example.trim()],
          isCustom: true,
        },
      ]);
    } else if (activeField === 'framework') {
      const list = customFrameworks[stage] || [];
      if (list.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
        window.alert('You already have a custom script flow with that name.');
        return;
      }
      setCustomFrameworks((prev) => ({
        ...prev,
        [stage]: [...(prev[stage] || []), { name, desc: addForm.desc.trim(), isCustom: true }],
      }));
    }

    setAddForm(EMPTY_ADD_FORM);
    setShowAddForm(false);
  };

  const handleDeleteCustomAngle = (name) => {
    setCustomAngles((prev) => prev.filter((a) => a.name !== name));
    setSelection((prev) => ({ ...prev, hook: 0 }));
  };

  const handleDeleteCustomHook = (name) => {
    setCustomHooks((prev) => prev.filter((h) => h.name !== name));
    setSelection((prev) => ({ ...prev, hook: 0 }));
  };

  const handleDeleteCustomFramework = (stageKey, name) => {
    setCustomFrameworks((prev) => ({
      ...prev,
      [stageKey]: (prev[stageKey] || []).filter((f) => f.name !== name),
    }));
    setSelection((prev) => ({ ...prev, framework: 0 }));
  };

  const handleExportLibrary = () => {
    const json = buildCustomLibraryExport({ angles: customAngles, hooks: customHooks, frameworks: customFrameworks });
    downloadTextFile(json, 'my-custom-hooks.json', 'application/json;charset=utf-8;');
  };

  const handleImportLibrary = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setImportError('');
    try {
      const imported = JSON.parse(await readTextFile(file));
      const merged = mergeCustomLibrary(
        { angles: customAngles, hooks: customHooks, frameworks: customFrameworks },
        imported
      );
      setCustomAngles(merged.angles);
      setCustomHooks(merged.hooks);
      setCustomFrameworks(merged.frameworks);
    } catch {
      setImportError("Couldn't read that file. Make sure it's a custom-hooks export from this tool.");
    }
  };

  return (
    <div className="ss-step">
      <h2>Step 3: Script Cards</h2>

      <div className="ss-field ss-big-topic">
        <label className="ss-topic-label">Your topic</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type or paste a topic, switch it anytime without leaving this step"
          rows={2}
        />
      </div>

      <p className="ss-hint ss-businesstype-reminder">
        You set up as a <strong>{BUSINESS_TYPES[businessType].label}</strong> in Step 2, aim for
        TOFU {BUSINESS_TYPES[businessType].ratio.TOFU}% / MOFU{' '}
        {BUSINESS_TYPES[businessType].ratio.MOFU}% / BOFU {BUSINESS_TYPES[businessType].ratio.BOFU}%
        overall.
      </p>

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

      <div className="ss-custom-library-row">
        <span className="ss-hint">
          Add your own hooks and script flows below, then keep a backup:
        </span>
        <div className="ss-custom-library-actions">
          <button type="button" className="ss-btn-text" onClick={handleExportLibrary}>
            Download my custom hooks
          </button>
          <label className="ss-btn-text ss-import-label">
            Import custom hooks
            <input type="file" accept=".json" onChange={handleImportLibrary} hidden />
          </label>
        </div>
        {importError && <p className="ss-hint ss-import-error">{importError}</p>}
      </div>

      <div className="ss-two-col">
        <div className="ss-col-left">
          {fields.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`ss-field-row ${activeField === f.key ? 'active' : ''}`}
              onClick={() => changeActiveField(f.key)}
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
                  {group.items.map((opt) => (
                    <div key={`${opt.principleIdx}-${opt.exampleIdx}`} className="ss-option-wrap">
                      <button
                        type="button"
                        className={`ss-option ss-option-hook ${selection.hook === opt.i ? 'selected' : ''}`}
                        onClick={() => handlePick(opt.i)}
                      >
                        <span className="ss-option-hook-title">
                          {group.principle.name}
                          {group.principle.subtitle ? ` (${group.principle.subtitle})` : ''}
                          {group.principle.isCustom && <span className="ss-option-custom-badge">Custom</span>}
                        </span>
                        <span className="ss-option-hook-desc">{group.principle.psychology}</span>
                        <span className="ss-option-hook-example">E.g. &quot;{opt.example}&quot;</span>
                      </button>
                      {group.principle.isCustom && (
                        <button
                          type="button"
                          className="ss-option-delete"
                          aria-label={`Delete custom hook ${group.principle.name}`}
                          onClick={() => handleDeleteCustomHook(group.principle.name)}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}

            {!isPsychologyHook &&
              filteredOptions.map((opt) => (
                <div key={opt.name} className="ss-option-wrap">
                  <button
                    type="button"
                    className={`ss-option ${selection[activeField] === opt.i ? 'selected' : ''}`}
                    onClick={() => handlePick(opt.i)}
                  >
                    <span className="ss-option-name">
                      {opt.name}
                      {opt.isCustom && <span className="ss-option-custom-badge">Custom</span>}
                    </span>
                    {opt.desc && <span className="ss-option-desc">{opt.desc}</span>}
                    {opt.example && <span className="ss-option-example">&quot;{opt.example}&quot;</span>}
                  </button>
                  {opt.isCustom && (
                    <button
                      type="button"
                      className="ss-option-delete"
                      aria-label={`Delete custom ${activeField} ${opt.name}`}
                      onClick={() =>
                        activeField === 'hook'
                          ? handleDeleteCustomAngle(opt.name)
                          : handleDeleteCustomFramework(stage, opt.name)
                      }
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

            {filteredOptions.length === 0 && <p className="ss-hint">No matches.</p>}
          </div>

          {(activeField === 'hook' || activeField === 'framework') && (
            <div className="ss-add-custom">
              {!showAddForm ? (
                <button
                  type="button"
                  className="ss-add-custom-toggle"
                  onClick={() => setShowAddForm(true)}
                >
                  + Add your own {activeField === 'hook' ? 'hook' : 'script flow'}
                </button>
              ) : (
                <div className="ss-add-custom-form">
                  <input
                    type="text"
                    placeholder="Name"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  />
                  {activeField === 'hook' && stage !== 'TOFU' && (
                    <input
                      type="text"
                      placeholder="Subtitle (optional)"
                      value={addForm.subtitle}
                      onChange={(e) => setAddForm({ ...addForm, subtitle: e.target.value })}
                    />
                  )}
                  {(activeField === 'framework' || (activeField === 'hook' && stage === 'TOFU')) && (
                    <input
                      type="text"
                      placeholder="What it does"
                      value={addForm.desc}
                      onChange={(e) => setAddForm({ ...addForm, desc: e.target.value })}
                    />
                  )}
                  {activeField === 'hook' && stage !== 'TOFU' && (
                    <>
                      <input
                        type="text"
                        placeholder="Why it works (the psychology)"
                        value={addForm.psychology}
                        onChange={(e) => setAddForm({ ...addForm, psychology: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="How to use it"
                        value={addForm.application}
                        onChange={(e) => setAddForm({ ...addForm, application: e.target.value })}
                      />
                    </>
                  )}
                  {activeField === 'hook' && (
                    <input
                      type="text"
                      placeholder="Example line"
                      value={addForm.example}
                      onChange={(e) => setAddForm({ ...addForm, example: e.target.value })}
                    />
                  )}
                  <div className="ss-add-custom-actions">
                    <button type="button" className="ss-btn ss-btn-small" onClick={handleAddCustom}>
                      Add
                    </button>
                    <button
                      type="button"
                      className="ss-btn-text"
                      onClick={() => {
                        setShowAddForm(false);
                        setAddForm(EMPTY_ADD_FORM);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`ss-output ${ctaConfirmed ? 'ready' : ''}`}>
        <div className="ss-output-header">
          <span>Your final AI prompt{ctaConfirmed ? ', ready to use!' : ''}</span>
          <button className="ss-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre>{prompt}</pre>
      </div>

      <div className="ss-bottom-actions">
        <button className="ss-btn ss-btn-next" onClick={onNext} type="button">
          Next: Bonus Calendar →
        </button>
        <button className="ss-restart-btn" onClick={handleRestart} type="button">
          Restart
        </button>
      </div>
    </div>
  );
}
