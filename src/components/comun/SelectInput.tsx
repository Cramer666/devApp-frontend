import React from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  value: string | number | boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
}

export const SelectInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false
}) => (
  <div className="mb-3">
    <label className="form-label fw-bold">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    <select
      className={`form-select ${disabled ? "bg-light" : ""}`}
      name={name}
      value={String(value)}
      onChange={onChange}
      required={required}
      disabled={disabled}
    >
      <option value="">Seleccione una opción</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);