import React from "react";

//me deja renderizar cualquier tipo de campo del formulario
//sin tener q hacer un componente nuevo cada vez
interface TextInputProps {
  type: string;
  name: string;
  label: string;
  value?: string | number;
  checked?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  value,
  checked,
  onChange,
  required,
  disabled,
}) => (
  <div className="form-group form-check">
    {type === "checkbox" ? (
      <>
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-check-input"
        />
        <label htmlFor={name} className="form-check-label">{label}</label>
      </>
    ) : (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-control"
        />
      </>
    )}
  </div>
);
