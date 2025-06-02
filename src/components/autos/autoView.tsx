import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Auto } from "../../models/auto";
import { getAutoById } from "../../services/autosServ";
import { getPersonaById } from "../../services/personasServ";

export const AutoView: FC = () => {
  const [auto, setAuto] = useState<Auto | null>(null);
  const [duenio, setDuenio] = useState<{ nombre: string, apellido: string } | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAutoById(id)
        .then(res => {
          setAuto(res.data);
          return getPersonaById(res.data.duenioId ?? "");
        })
        .then(res => setDuenio(res.data))
        .catch(() => navigate("/autos"));
    }
  }, [id, navigate]);

  if (!auto) return <div className="text-center">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h1 className= "navbar-brand text-black">Detalles del Auto</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{auto.marca} {auto.modelo}</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Patente:</strong> {auto.patente}</p>
              <p><strong>Año:</strong> {auto.anio}</p>
              <p><strong>Color:</strong> {auto.color}</p>
            </div>
            <div className="col-md-6">
              <p><strong>N° Chasis:</strong> {auto.nroDeChasis}</p>
              <p><strong>Motor:</strong> {auto.motor}</p>
              <p><strong>Dueño:</strong> {duenio?.nombre} {duenio?.apellido}</p>
            </div>
          </div>
          <button 
            className="btn btn-primary me-2"
            onClick={() => navigate(`/autos/editar/${auto.id}`)}
          >
            Editar
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate("/autos")}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};  