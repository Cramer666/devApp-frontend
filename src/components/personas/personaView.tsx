import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonaById } from "../../services/personasServ";

export const PersonaView: FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPersonaById(id)
        .then(res => setPersona(res.data))
        .catch(() => navigate("/personas", { replace: true }))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (!persona) return <div>Persona no encontrada</div>;

  return (
    <div className="container mt-4">
      <h2>Detalles de Persona</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{persona.nombre} {persona.apellido}</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>DNI:</strong> {persona.dni}</p>
              <p><strong>Teléfono:</strong> {persona.telefono || "-"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Email:</strong> {persona.email || "-"}</p>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/personas/editar/${persona.id}`)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};