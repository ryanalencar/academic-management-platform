import type { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export function Select({ label, options, error, id, ...props }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="form-field">
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} className={error ? 'input-error' : ''} {...props}>
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
