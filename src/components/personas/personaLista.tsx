import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonas, deletePersona } from "../../services/personasServ";
import { GenericList } from "../comun/listaGenerica";

export const PersonaList = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cargarPersonas = async () => {
    setLoading(true);
    try {
      const res = await getPersonas();
      console.log("PERSONAS:", res.data);
      setPersonas(res.data);
    } catch (err) {
      console.error("Error al cargar personas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Querés eliminar esta persona?")) {
      setLoading(true);
      deletePersona(id)
        .then(() => cargarPersonas())
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <GenericList
      title="Lista de Personas"
      data={personas}
      columnas={[
        { label: "Nombre", key: "nombre" },
        { label: "Apellido", key: "apellido" },
        { label: "DNI", key: "dni" }
      ]}
      loading={loading}
      onVer={(persona) => navigate(`/personas/${persona.id}`)}
      onEditar={(persona) => navigate(`/personas/editar/${persona.id}`)}
      onEliminar={(persona) => handleDelete(persona.id)}
      onCreate={() => navigate("/personas/crear")}
    />
  );
};
