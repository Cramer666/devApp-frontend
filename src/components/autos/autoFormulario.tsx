import { FC, useEffect, useState } from "react";
import { Persona } from "../../models/persona";
import { getPersonas } from "../../services/personasServ";
import { AutoConDuenio } from "../../models/autoDuenio";


interface Props {
  onSubmit: (a: Omit<AutoConDuenio, "id">) => void;
  initial?: AutoConDuenio; 
}

export const AutoForm: FC<Props> = ({ onSubmit, initial }) => {
  const [form, setForm] = useState<Omit<AutoConDuenio, "id">>({
    patente: initial?.patente|| "",
    marca: initial?.marca || "",
    modelo: initial?.modelo || "",
    anio: initial?.anio || 0,
    color: initial?.color || "",
    nroDeChasis: initial?.nroDeChasis || "",
    motor: initial?.motor || "",
    duenioId: initial?.duenioId || "",
    nombreDuenio: initial?.nombreDuenio || '',
    apellidoDuenio: initial?.apellidoDuenio || ''
  });

  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    getPersonas().then(res => setPersonas(res.data));
  }, []);

  useEffect(() => {
    if (initial) {
      setForm({
        patente: initial.patente,
        marca: initial.marca,
        modelo: initial.modelo,
        anio: initial.anio,
        color: initial.color,
        nroDeChasis: initial.nroDeChasis,
        motor: initial.motor,
        duenioId: initial.duenioId,
        nombreDuenio: initial.nombreDuenio,
        apellidoDuenio: initial.apellidoDuenio
      });
    }
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "anio" || name === "duenioId" ? Number(value) : value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="mb-2">
        <input
          name="patente"
          value={form.patente}
          onChange={handleChange}
          className="form-control"
          placeholder="Patente"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="marca"
          value={form.marca}
          onChange={handleChange}
          className="form-control"
          placeholder="Marca"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          className="form-control"
          placeholder="Modelo"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="anio"
          value={form.anio}
          onChange={handleChange}
          className="form-control"
          placeholder="Año"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          className="form-control"
          placeholder="Color"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="nroDeChasis"
          value={form.nroDeChasis}
          onChange={handleChange}
          className="form-control"
          placeholder="Nro de Chasis"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="motor"
          value={form.motor}
          onChange={handleChange}
          className="form-control"
          placeholder="Motor"
          required
        />
      </div>
      <div className="mb-2">
        <select
          name="duenioId"
          value={form.duenioId}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value={0} disabled>
            Seleccionar dueño
          </option>
          {personas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        Guardar
      </button>
    </form>
  );
};
