import { FC } from "react";
import { Persona } from "../../models/persona";
import { ActionButtons } from "../comun/botonPrincipal";

interface Props {
  personas: Persona[];
  onEdit: (p: Persona) => void;
  onDelete: (p: Persona) => void;
}

export const PersonaTable: FC<Props> = ({ personas, onEdit, onDelete }) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {personas.map(p => (
        <tr key={p.id}>
          <td>{p.nombre}</td>
          <td>{p.apellido}</td>
          <td>{p.dni}</td>
          <td><ActionButtons onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} /></td>
        </tr>
      ))}
    </tbody>
  </table>
);
