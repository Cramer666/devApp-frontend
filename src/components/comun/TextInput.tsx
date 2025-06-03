import React from "react";

interface Props {
  label: string;
  name: string;
  value: string | number | boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  type?: string;
}

export const TextInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  type = "text"
}) => {
  if (type === "checkbox") {
    return (
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          name={name}
          id={name}
          checked={Boolean(value)}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="form-check-label fw-bold" htmlFor={name}>
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        className={`form-control ${disabled ? "bg-light" : ""}`}
        name={name}
        id={name}
        value={value as string | number}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
