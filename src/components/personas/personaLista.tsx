import { useEffect, useState } from "react";
import { Persona } from "../../models/persona";
import { getPersonas, deletePersona } from "../../services/personasServ";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const PersonaList = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cargarPersonas = () => {
    setLoading(true);
    getPersonas()
      .then(res => setPersonas(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro que desea eliminar esta persona?")) {
      setLoading(true);
      deletePersona(id)
        .then(cargarPersonas)
        .catch(error => console.error("Error eliminando persona:", error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Listado de Personas</h3>
          <button 
            className="btn btn-light btn-sm"
            onClick={() => navigate('/personas/crear')}
          >
            <FaPlus className="me-1" /> Nueva Persona
          </button>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
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
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => navigate(`/personas/${persona.id}`)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-warning btn-sm text-white"
                            onClick={() => navigate(`/personas/editar/${persona.id}`)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(persona.id))}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};