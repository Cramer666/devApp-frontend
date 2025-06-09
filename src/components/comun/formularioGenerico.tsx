import React from "react";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { Campo } from "./campo";

interface Props {
  campos: Campo[];
  form: Record<string, string | number | boolean | Date | null>;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  onSubmit: React.FormEventHandler;
  loading?: boolean;
  isEditing?: boolean;
  disabledFields?: string[];
  title?: string;
  navigateTo: () => void;
}

const normalizeValue = (value: string | number | boolean | Date | null): string | number => {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false"; 
  }
  return value ?? "";
};

export const GenericForm: React.FC<Props> = ({
  campos,
  form,
  onChange,
  onSubmit,
  loading = false,
  isEditing = false,
  disabledFields = [],
  title = "Formulario",
  navigateTo
}) => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">{title}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3 mb-4">
             {campos.map((campo, idx) => {
                const valor = form[campo.name];
                const normalizedValue = normalizeValue(valor);
                const restProps = {
                  name: campo.name,
                  label: campo.label,
                  onChange,
                  required: campo.required,
                  disabled: disabledFields.includes(campo.name),
                };

                if (campo.tipo === "select") {
                  return (
                    <div className="col-md-6" key={idx}>
                      <SelectInput key={idx} {...restProps} value={normalizedValue} options={campo.options || []} />
                    </div>
                  );
                } else if (campo.tipo === "checkbox") {
                  return (
                    <div className="col-md-6" key={idx}>
                      <TextInput key={idx} {...restProps} type="checkbox" checked={Boolean(valor)} />
                    </div>
                  );
                } else {
                  return (
                    <div className="col-md-6" key={idx}>
                      <TextInput key={idx} {...restProps} type={campo.tipo} value={normalizedValue} />
                    </div>
                  );
                }
              })}
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={navigateTo} disabled={loading}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {isEditing ? "Actualizando..." : "Creando..."}
                  </>
                ) : isEditing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
