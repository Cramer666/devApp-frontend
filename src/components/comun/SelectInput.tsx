import React from "react";

//Es como una plantilla inteligente para hacer menus desplegables.
interface Option {
  value: string | number;
  label: string;
}

//Son como los "parámetros" que le paso a x componente...
interface Props {
  name: string;
  label: string;
  value: string | number | undefined | null;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
}

export const SelectInput: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
  required,
  disabled,
  options
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        name={name}
        className="form-select"
        value={value ?? ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
