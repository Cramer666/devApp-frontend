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
    if (window.confirm("¿Estás seguro de eliminar esta persona?")) {
      setLoading(true);
      deletePersona(id)
        .then(() => cargarPersonas())
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <GenericList<Persona>
      title="Lista de Personas"
      data={personas}
      columnas={[
        { label: "Nombre", key: "nombre" },
        { label: "Apellido", key: "apellido" },
        { label: "DNI", key: "dni" }
      ]}
      loading={loading}
      actions={[
        {
          label: "Ver",
          color: "info",
          onClick: (persona) => navigate(`/personas/${persona.id}`)
        },
        {
          label: "Editar",
          color: "warning",
          onClick: (persona) => navigate(`/personas/editar/${persona.id}`)
        },
        {
          label: "Eliminar",
          color: "danger",
          onClick: (persona) => handleDelete(persona.id)
        }
      ]}
      showCreateButton={true}
      onCreate={() => navigate("/personas/crear")}
    />
  );
};