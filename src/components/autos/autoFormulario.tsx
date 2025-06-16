import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auto } from "../../models/auto";
import { Persona } from "../../models/persona";
import { getAutoById, createAuto, updateAuto } from "../../services/autosServ";
import { getPersonas } from "../../services/personasServ";
import { GenericForm } from "../comun/formularioGenerico";
import { Campo } from "../../components/comun/campo";

export const AutoForm: FC = () => {
  const [form, setForm] = useState<Omit<Auto, "id">>({
    patente: "",
    marca: "",
    modelo: "",
    anio: 0,
    color: "",
    nroDeChasis: "",
    motor: "",
    duenioId: "",
  });

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = String(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [personasRes, autoRes] = await Promise.all([
        getPersonas(),
        isEditing && id ? getAutoById(id) : Promise.resolve({ data: null })
      ]);
      setPersonas(personasRes.data);

      if (autoRes.data) {
        setForm({
          patente: autoRes.data.patente ?? "",
          marca: autoRes.data.marca ?? "",
          modelo: autoRes.data.modelo ?? "",
          anio: autoRes.data.anio ?? undefined,
          color: autoRes.data.color ?? "",
          nroDeChasis: autoRes.data.nroDeChasis ?? "",
          motor: autoRes.data.motor ?? "",
          duenioId: autoRes.data.duenioId ?? "",
        });
      }

      setLoading(false);
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "anio" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateAuto(id, form as Auto);
      } else {
        await createAuto(form);
      }
      navigate("/autos");
    } catch (error) {
      console.error("Error al crear/actualizar auto:", error);
    } finally {
      setLoading(false);
    }
  };

  const campos: Campo[] = [
    { tipo: "text", label: "Patente", name: "patente", required: true },
    { tipo: "text", label: "Marca", name: "marca", required: true },
    { tipo: "text", label: "Modelo", name: "modelo", required: true },
    { tipo: "number", label: "Año", name: "anio", required: true },
    { tipo: "text", label: "Color", name: "color", required: false },
    { tipo: "text", label: "N° Chasis", name: "nroDeChasis", required: true },
    { tipo: "text", label: "Motor", name: "motor", required: false },
    {
      tipo: "select",
      label: "Dueño",
      name: "duenioId",
      required: false,
      options: personas.map((p) => ({
        label: `${p.nombre} ${p.apellido} (DNI: ${p.dni})`,
        value: p.id ?? "", 
      })),
    },
  ];

  return (
    <GenericForm
      campos={campos}
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={isEditing}
      navigateTo={() => navigate("/autos")}
    />
  );
};
