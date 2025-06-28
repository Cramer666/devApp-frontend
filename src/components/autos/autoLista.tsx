import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auto } from "../../models/auto";
import { getAutos } from "../../services/autosServ";
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

  const handleViewOwner = (auto: Auto) => {
    if (auto.duenioId) {
      navigate(`/personas/${auto.duenioId}`);
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
      actions={[
        {
          label: "Ver Dueño",
          color: "light",
          onClick: handleViewOwner,
          disabled: (auto) => !auto.duenioId
        }
      ]}
      showCreateButton={false} // Desactiva el botón de creación
    />
  );
};