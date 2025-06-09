import { useEffect, useState } from "react";
import { Persona } from "../../models/persona";
import { getPersonas, deletePersona } from "../../services/personasServ";
import { useNavigate } from "react-router-dom";
import { GenericList } from "../comun/listaGenerica";

export const PersonaList = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPersonas().then(res => setPersonas(res.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estas seguro que queres eliminar esta persona?")) {
      setLoading(true);
      deletePersona(id)
        .then(() => getPersonas().then(res => setPersonas(res.data)))
        .finally(() => setLoading(false));
    }
  };

  return (
    <GenericList
      title="Lista de Personas"
      data={personas}
      columnas={[
        { label: "Dni", key: "dni" },
        { label: "Nombre", key: "nombre" },
        { label: "Apellido", key: "apellido" }
      ]}
      loading={loading}
      onVer={(p) => navigate(`/personas/${p.id}`)}
      onEditar={(p) => navigate(`/personas/editar/${p.id}`)}
      onEliminar={(p) => handleDelete(p.id)}
      onCreate={() => navigate("/personas/crear")}
    />
  );
};
