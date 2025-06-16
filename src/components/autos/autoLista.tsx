import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auto } from "../../models/auto";
import { getAutos, deleteAuto } from "../../services/autosServ";
import { GenericList } from "../comun/listaGenerica";

export const AutoList = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cargarAutos = async () => {
    setLoading(true);
    try {
      const res = await getAutos();
      setAutos(res.data);
    } catch (err) {
      console.error("Error al cargar autos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Queres eliminar este auto?")) {
      setLoading(true);
      deleteAuto(id)
        .then(() => cargarAutos())
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <GenericList
      title="Lista de Autos"
      data={autos}
      columnas={[
        { label: "Patente", key: "patente" },
        { label: "Marca", key: "marca" },
        { label: "Modelo", key: "modelo" },
        { label: "Año", key: "anio" }
      ]}
      loading={loading}
      onVer={(auto) => navigate(`/autos/${auto.id}`)}
      onEditar={(auto) => navigate(`/autos/editar/${auto.id}`)}
      onEliminar={(auto) => handleDelete(auto.id)}
      onCreate={() => navigate("/autos/crear")}
    />
  );
};
