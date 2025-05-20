import { useEffect, useState } from "react";
import { Persona } from "../../models/persona";
import { getPersonas, deletePersona } from "../../services/personasServ";
import { useNavigate } from "react-router-dom";
import { ActionButtons } from "../comun/botonPrincipal";

export const PersonaList = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const navigate = useNavigate();

  const cargarPersonas = () => {
    getPersonas().then(res => setPersonas(res.data));
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro que desea eliminar esta persona?")) {
      deletePersona(id)
        .then(cargarPersonas)
        .catch(error => console.error("Error eliminando persona:", error));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Personas</h1>
        <button 
          className="btn btn-success"
          onClick={() => navigate('/personas/crear')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Agregar nueva
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map(persona => (
              <tr key={persona.id}>
                <td>{persona.dni}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>
                  <ActionButtons
                    onView={() => navigate(`/personas/${persona.id}`)}
                    onEdit={() => navigate(`/personas/editar/${persona.id}`)}
                    onDelete={() => handleDelete(String(persona.id))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};