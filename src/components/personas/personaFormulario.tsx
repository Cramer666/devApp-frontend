import { FC, useState } from "react";
import { Persona } from "../../models/persona";

interface Props {
  onSubmit: (p: Omit<Persona, "id">) => void;
  initial?: Persona;
}

export const PersonaForm: FC<Props> = ({ onSubmit, initial }) => {
  const [form, setForm] = useState<Omit<Persona, "id">>({
    nombre: initial?.nombre || "",
    apellido: initial?.apellido || "",
    dni: initial?.dni || "",
    fechaDeNacimiento: initial?.fechaDeNacimiento
    ? new Date(initial.fechaDeNacimiento)
    : new Date(),    
    genero: initial?.genero|| "",
    donante: initial?.donante?? true, 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          ...form,
          fechaDeNacimiento: new Date(form.fechaDeNacimiento), // convertir a Date
        });
      }}
    >
      <div className="mb-2">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="form-control"
          placeholder="Nombre"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          className="form-control"
          placeholder="Apellido"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="dni"
          value={form.dni}
          onChange={handleChange}
          className="form-control"
          placeholder="DNI"
          required
        />
      </div>
      <div className="mb-2">
      <input
          type="date"
          name="fechaDeNacimiento"
          value={
            form.fechaDeNacimiento
              ? new Date(form.fechaDeNacimiento).toISOString().split("T")[0]
              : ""
  }
  onChange={handleChange}
  className="form-control"
  required
/>

      </div>
      <div className="mb-2">
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Selecciona el genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="No binario">No binario</option>
        </select>
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="donante"
          checked={form.donante}
          onChange={e => setForm({ ...form, donante: e.target.checked })}
          className="form-check-input"
          id="donanteCheck"
        />
        <label className="form-check-label" htmlFor="donanteCheck">
          ¿Es donante?
        </label>
      </div>
      <button type="submit" className="btn btn-success">
        Guardar
      </button>
    </form>
  );
  
};
