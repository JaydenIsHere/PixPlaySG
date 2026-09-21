export default function Grid9({ title, centerLabel, values, onChange, placeholderPrefix }) {
  const handleCellChange = (i) => (e) => {
    const next = [...values];
    next[i] = e.target.value;
    onChange(next);
  };

  return (
    <div className="ss-grid9-block">
      <h3 className="ss-grid9-title">{title}</h3>
      <div className="ss-grid9">
        {values.slice(0, 4).map((v, i) => (
          <input
            key={i}
            type="text"
            value={v}
            onChange={handleCellChange(i)}
            placeholder={`${placeholderPrefix} ${i + 1}`}
          />
        ))}
        <div className="ss-grid9-center">{centerLabel}</div>
        {values.slice(4, 8).map((v, i) => (
          <input
            key={i + 4}
            type="text"
            value={v}
            onChange={handleCellChange(i + 4)}
            placeholder={`${placeholderPrefix} ${i + 5}`}
          />
        ))}
      </div>
    </div>
  );
}
