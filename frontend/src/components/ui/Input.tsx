import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="form-field">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} className={error ? 'input-error' : ''} {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
