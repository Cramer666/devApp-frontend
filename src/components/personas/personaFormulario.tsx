import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonaById, createPersona, updatePersona } from "../../services/personasServ";
import { GenericForm } from "../comun/formularioGenerico";
import { Campo } from "../comun/campo";

export const PersonaForm: FC = () => {
  const [form, setForm] = useState<Omit<Persona, "id">>({
    nombre: "",
    apellido: "",
    DNI: "",
    fechaDeNacimiento: new Date(),
    genero: "Masculino",
    donante: false,
    vehiculo: []
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      getPersonaById(id).then(res => {
        setForm(res.data);
      }).finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && id) await updatePersona(id, form);
      else await createPersona(form);
      navigate("/personas");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const campos: Campo[] = [
    { tipo: "text", label: "Nombre", name: "nombre", required: true },
    { tipo: "text", label: "Apellido", name: "apellido", required: true },
    { tipo: "text", label: "DNI", name: "DNI", required: true },
    { tipo: "select", label: "Género", name: "genero", required: true, options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
      { label: "No binario", value: "No binario" }
    ]},
    { tipo: "date", label: "Fecha de Nacimiento", name: "fechaDeNacimiento" },
    { tipo: "checkbox", label: "Donante", name: "donante" }
  ];

  return (
    <GenericForm
      campos={campos}
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={isEditing}
      navigateTo={() => navigate("/personas")}
    />
  );
};