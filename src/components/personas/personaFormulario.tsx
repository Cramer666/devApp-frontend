import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonaById, createPersona, updatePersona } from "../../services/personasServ";
import { GenericForm } from "../comun/formularioGenerico";
import { Campo } from "../comun/campo";
import { genero } from "../../models/generoEnum";

export const PersonaForm: FC = () => {
  const [form, setForm] = useState<Omit<Persona, "id">>({
    nombre: "",
    apellido: "",
    dni: "",
    fechaDeNacimiento: new Date(),
    genero: genero.Femenino,
    donante: false,
    vehiculo: []
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const formatDateInput = (date: Date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      getPersonaById(id).then(res => {
        setForm(res.data);
      }).finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : type === "date"
          ? new Date(value + "T00:00:00")  
          : value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const fechaFormateada =
      form.fechaDeNacimiento instanceof Date && !isNaN(form.fechaDeNacimiento.getTime())
        ? form.fechaDeNacimiento.toISOString().split("T")[0]
        : "";

    const payload: Omit<Persona, "id"> = {
      ...form,
      fechaDeNacimiento: fechaFormateada as unknown as Date
    };

    if (isEditing && id) {
      await updatePersona(id, payload);
    } else {
      console.log("Payload a enviar:", payload);
      await createPersona(payload); 
    }

    navigate("/personas");
  } catch  {
    console.error("Error al guardar la persona");
  } finally {
    setLoading(false);
  }
};

  const formFiltered: Record<string, string | boolean| genero> = {
    nombre: form.nombre,
    apellido: form.apellido,
    dni: form.dni,
    fechaDeNacimiento: formatDateInput(form.fechaDeNacimiento),
    genero: form.genero,
    donante: form.donante ?? false
  };

  const campos: Campo[] = [
    { tipo: "text", label: "Nombre", name: "nombre", required: true },
    { tipo: "text", label: "Apellido", name: "apellido", required: true },
    { tipo: "text", label: "dni", name: "dni", required: true },
    {
      tipo: "select",
      label: "Género",
      name: "genero",
      required: true,
      options: [
        { label: "Masculino", value: "Masculino" },
        { label: "Femenino", value: "Femenino" },
        { label: "No binario", value: "No binario" }
      ]
    },
    { tipo: "date", label: "Fecha de Nacimiento", name: "fechaDeNacimiento" },
    { tipo: "checkbox", label: "Donante", name: "donante" }
  ];

  return (
    <GenericForm
      campos={campos}
      form={formFiltered}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={isEditing}
      navigateTo={() => navigate("/personas")}
    />
  );
};
