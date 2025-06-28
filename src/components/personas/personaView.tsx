import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { Auto } from "../../models/auto";
import { getPersonaById, deletePersona } from "../../services/personasServ";
import { deleteAuto, getDueniosById } from "../../services/autosServ";
import { genero } from "../../models/generoEnum";

export const PersonaView: FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPersonaById(id)
        .then(res => {
          setPersona(res.data);
          return getDueniosById(res.data.id ?? "");
        })
        .then(res => setAutos(res.data))
        .catch(() => navigate("/personas"))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleDeletePersona = () => {
    if (id && window.confirm("¿Estás seguro de eliminar esta persona?")) {
      setLoading(true);
      deletePersona(id)
        .then(() => navigate("/personas"))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  const handleDeleteAuto = (autoId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este auto?")) {
      setLoading(true);
      deleteAuto(autoId)
        .then(() => setAutos(autos.filter(a => a.id !== autoId)))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (!persona) return <div className="text-center py-4">Persona no encontrada</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Detalles de Persona</h3>
        </div>
        
        <div className="card-body">
          {/*Esta es la prsona */}
          <div className="mb-4">
            <h4>{persona.nombre} {persona.apellido}</h4>
            <div className="row">
              <div className="col-md-6">
                <p><strong>DNI:</strong> {persona.dni}</p>
                <p><strong>Fecha Nacimiento:</strong> {new Date(persona.fechaNacimiento).toLocaleDateString()}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Género:</strong> {genero[persona.genero]}</p>
                <p><strong>Donante:</strong> {persona.donante ? "Sí" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Estos sus autos */}
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Autos Asociados</h4>
              <button
                className="btn btn-success btn-sm"
                onClick={() => navigate(`/autos/crear?duenioId=${persona.id}`)}
                disabled={loading}
              >
                Agregar Auto
              </button>
            </div>

            {autos.length === 0 ? (
              <p className="text-center">No hay autos asociados</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Patente</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Año</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autos.map(auto => (
                      <tr key={auto.id}>
                        <td>{auto.patente}</td>
                        <td>{auto.marca}</td>
                        <td>{auto.modelo}</td>
                        <td>{auto.anio}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => navigate(`/autos/${auto.id}`)}
                              disabled={loading}
                            >
                              Ver
                            </button>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => navigate(`/autos/editar/${auto.id}`)}
                              disabled={loading}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteAuto(auto.id)}
                              disabled={loading}
                            >
                              Eliminar
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

        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/personas")}
            disabled={loading}
          >
            Volver al listado
          </button>
          <div>
            <button
              className="btn btn-warning me-2"
              onClick={() => navigate(`/personas/editar/${id}`)}
              disabled={loading}
            >
              Editar persona
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDeletePersona}
              disabled={loading}
            >
              Eliminar persona
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};