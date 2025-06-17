import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { Auto } from "../../models/auto";
import { getPersonaById } from "../../services/personasServ";
import { getDueniosById } from "../../services/autosServ";
//Los handle_X son funciones que "manejan" o "se encargan de"
// ciertas acciones del usuario.
export const PersonaView: FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [autos, setAutos] = useState<Auto[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPersonaById(id)
        .then(res => {
          setPersona(res.data);
          return  getDueniosById (res.data.id ?? "");
        })
        .then(res => setAutos(res.data))
        .catch(() => navigate("/personas"));
    }
  }, [id, navigate]);

  if (!persona) return <div className="text-center">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h1 className="navbar-brand text-black">Detalles de la Persona</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{persona.nombre} {persona.apellido}</h5>
          <p><strong>DNI:</strong> {persona.dni}</p>
          <p><strong>Fecha Nacimiento:</strong> {new Date(persona.fechaNacimiento).toLocaleDateString()}</p>
        </div>
      </div>

      <h3>Autos asociados</h3>
      {autos.length === 0 ? (
        <p>No tiene autos asociados.</p>
      ) : (
        <ul className="list-group">
          {autos.map(auto => (
            <li
              key={auto.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{cursor: "pointer"}}
              onClick={() => navigate(`/autos/${auto.id}`)}
            >
              {auto.marca} {auto.modelo} - {auto.patente}
            </li>
          ))}
        </ul>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/personas")}
      >
        Volver
      </button>
    </div>
  );
};