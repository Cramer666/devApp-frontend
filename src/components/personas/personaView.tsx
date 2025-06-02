import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonaById } from "../../services/personasServ";

export const PersonaView: FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPersonaById(id)
        .then((res) => {
          console.log("Datos recibidos:", res.data);
          setPersona(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener persona:", err);
          setError("No se pudo cargar la persona.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!persona) return <div>Persona no encontrada</div>;

  return (
    <div className="container mt-4">
      <h1 className= "navbar-brand text-black">Detalles de Persona</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {persona.nombre} {persona.apellido}
          </h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>DNI:</strong> {persona.DNI}</p>
              <p><strong>Donante:</strong> {persona.donante ? "Sí" : "No"}</p>
              <p><strong>Género:</strong> {persona.genero || "-"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Autos:</strong></p>
              {Array.isArray(persona.vehiculo) && persona.vehiculo.length > 0 ? (
                <ul>
                  {persona.vehiculo.map((auto, i) => (
                    <li key={i}>
                      {auto.marca} {auto.modelo} - {auto.patente}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tiene autos registrados.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/personas/editar/${persona.id}`)}
        >
          Editar
        </button>
                  <button 
            className="btn btn-secondary"
            onClick={() => navigate("/personas")}
          >
            Volver
          </button>
      </div>
    </div>
  );
};
