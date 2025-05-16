import { useEffect, useState } from "react";
import { AutoConDuenio } from "../../models/autoDuenio";
import { deleteAuto, createAuto, updateAuto, getAutosConDuenio } from "../../services/autosServ";
import { AutoForm } from "./autoFormulario";
import { ActionButtons } from "../../components/comun/botonPrincipal";

export const AutoList = () => {
  const [autos, setAutos] = useState<AutoConDuenio[]>([]);
  const [editando, setEditando] = useState<AutoConDuenio | null>(null);

  const cargarAutos = () => {
    getAutosConDuenio().then(res => {
      const autosConDuenio = res.data.map(auto => ({
        ...auto,
        nombreDuenio: auto.nombreDuenio || 'Sin dueño',
        apellidoDuenio: auto.apellidoDuenio || ''
      }));
      setAutos(autosConDuenio);
    });
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const handleSubmit = (auto: Omit<AutoConDuenio, "id">) => {
    if (editando) {
      updateAuto(Number(editando.id), { ...editando, ...auto }).then(() => {
        cargarAutos();
        setEditando(null);
      });
    } else {
      createAuto(auto).then(cargarAutos);
    }
  };

  return (
    <div>
      <h3 className="mb-4">{editando ? "Editar Auto" : "Agregar Auto"}</h3>
      
      <AutoForm
        key={editando?.id ?? "nuevo"}
        onSubmit={handleSubmit}
        initial={editando ?? undefined}
      />
      
      {editando && (
        <button 
          className="btn btn-secondary mb-3 mt-2" 
          onClick={() => setEditando(null)}
        >
          Cancelar edición
        </button>
      )}
      
      <hr className="my-4" />
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                  <ActionButtons
                    onEdit={() => setEditando(auto)}
                    onDelete={() => {
                      deleteAuto(auto.id)
                        .then(cargarAutos)
                        .catch(error => console.error("Error eliminando auto:", error));
                    }}
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