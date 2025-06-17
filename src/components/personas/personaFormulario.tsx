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
    fechaNacimiento: new Date(),
    genero: genero.Femenino,
    donante: false,
    vehiculo: []
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id;

 
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return "";
    
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };


  const parseDateFromInput = (dateString: string): Date => {
    if (!dateString) return new Date();
    return new Date(dateString);
  };

  // Función para parsear fechas del backend si vienen dist
  const parseBackendDate = (dateString: string): Date => {
    try {
      // parsea parsea, dijo Sebas xD
      const isoDate = new Date(dateString);
      if (!isNaN(isoDate.getTime())) return isoDate;

      
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day));
      }

      if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          
          if (parts[0].length === 1 && parts[1].length === 2 && parts[2].length === 2) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const year = 2000 + parseInt(parts[2]);
            return new Date(year, month, day);
          }
          
          return new Date(dateString);
        }
      }

      return new Date();
    } catch {
      return new Date();
    }
  };

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      getPersonaById(id)
        .then(res => {
          return setForm({
            ...res.data,
            fechaNacimiento: parseBackendDate(String(res.data.fechaNacimiento))
          });
        })
        .catch(() => navigate("/personas"))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" 
        ? checked 
        : type === "date" 
          ? parseDateFromInput(value)
          : value
    }));
  };

  //revisar esto, porq entra en el catch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await updatePersona(id, form);
      } else {
        await createPersona(form);
      }
      navigate("/personas");
    } catch (error) {
      console.error("Error al guardar persona:", error);
    } finally {
      setLoading(false);
    }
  };

  // preparo lo datos
  const formForInputs = {
    nombre: form.nombre,
    apellido: form.apellido,
    dni: form.dni,
    fechaNacimiento: formatDateForInput(form.fechaNacimiento),
    genero: form.genero,
    donante: form.donante
  };

  const campos: Campo[] = [
    { tipo: "text", label: "Nombre", name: "nombre", required: true },
    { tipo: "text", label: "Apellido", name: "apellido", required: true },
    { tipo: "text", label: "DNI", name: "dni", required: true },
    {
      tipo: "select",
      label: "Género",
      name: "genero",
      required: true,
      options: [
        { label: "Masculino", value: String(genero.Masculino) },
        { label: "Femenino", value: String(genero.Femenino) },
        { label: "No binario", value: String(genero.No_binario) }
      ]
    },
    { 
      tipo: "date", 
      label: "Fecha de Nacimiento", 
      name: "fechaNacimiento",
      required: true 
    },
    { tipo: "checkbox", label: "Donante", name: "donante" }
  ];

  return (
    <GenericForm
      campos={campos}
      form={formForInputs}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={isEditing}
      navigateTo={() => navigate("/personas")}
    />
  );
};