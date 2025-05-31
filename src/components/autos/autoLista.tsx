import { useEffect, useState } from "react";
import { Auto } from "../../models/auto";
import { deleteAuto, createAuto, updateAuto, getAutos } from "../../services/autosServ";
import { AutoForm } from "./autoFormulario";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export const AutoList = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [editando, setEditando] = useState<Auto | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cargarAutos = () => {
    setLoading(true);
    getAutos()
      .then(res => setAutos(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const handleSubmit = (auto: Omit<Auto, "id">) => {
    setLoading(true);
    const operation = editando 
      ? updateAuto(editando.id, { ...editando, ...auto })
      : createAuto(auto);
    
    operation
      .then(() => {
        cargarAutos();
        setEditando(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Listado de Autos</h3>
          <button 
            className="btn btn-light btn-sm"
            onClick={() => navigate('/autos/crear')}
          >
            <FaPlus className="me-1" /> Nuevo Auto
          </button>
        </div>

        <div className="card-body">
          {editando && (
            <div className="mb-4">
              <AutoForm
                key={editando.id}
                onSubmit={handleSubmit}
                initialData={editando}
              />
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setEditando(null)}
                disabled={loading}
              >
                <FaTimes className="me-1" /> Cancelar
              </button>
            </div>
          )}
          
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
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-info btn-sm"
                            onClick={() => navigate(`/autos/${auto.id}`)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn btn-warning btn-sm text-white"
                            onClick={() => setEditando(auto)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (window.confirm("¿Eliminar este auto?")) {
                                deleteAuto(auto.id).then(cargarAutos);
                              }
                            }}
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