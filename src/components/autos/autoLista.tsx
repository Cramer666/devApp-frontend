import { useEffect, useState } from "react";
import { Auto } from "../../models/auto";
import { deleteAuto, createAuto, updateAuto, getAutos } from "../../services/autosServ";
import { AutoForm } from "./autoFormulario";
import { useNavigate } from "react-router-dom";

export const AutoList = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [editando, setEditando] = useState<Auto | null>(null);
  const navigate = useNavigate();

  const cargarAutos = () => {
    getAutos().then(res => setAutos(res.data));
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const handleSubmit = (auto: Omit<Auto, "id">) => {
    if (editando) {
      updateAuto(Number(editando.id), { ...editando, ...auto })
        .then(() => {
          cargarAutos();
          setEditando(null);
        });
    } else {
      createAuto(auto).then(cargarAutos);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Autos</h1>
        <button 
          className="btn btn-success"
          onClick={() => navigate('/autos/crear')}
        >
          Agregar nuevo
        </button>
      </div>

      {editando && (
        <>
          <AutoForm
            key={editando.id}
            onSubmit={handleSubmit}
            initial={editando}
          />
          <button 
            className="btn btn-secondary mb-3" 
            onClick={() => setEditando(null)}
          >
            Cancelar edición
          </button>
        </>
      )}
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Patente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Color</th>
              <th>Chasis</th>
              <th>Motor</th>
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
                <td>{auto.color}</td>
                <td>{auto.nroDeChasis}</td>
                <td>{auto.motor}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-info"
                      onClick={() => navigate(`/autos/${auto.id}`)}
                    >
                      Ver
                    </button>
                    <button 
                      className="btn btn-warning text-white"
                      onClick={() => setEditando(auto)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => {
                        if (confirm("¿Eliminar este auto?")) {
                          deleteAuto(auto.id).then(cargarAutos);
                        }
                      }}
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
    </div>
  );
};