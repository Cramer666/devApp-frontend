import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auto } from "../../models/auto";
import { Persona } from "../../models/persona";
import { getAutoById, createAuto, updateAuto } from "../../services/autosServ";
import { getPersonas } from "../../services/personasServ";

interface Props {
  isEditing?: boolean;
  onSubmit?: (auto: Omit<Auto, "id">) => void; 
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  initialData?: Omit<Auto, "id">;
  disabledFields?: (keyof Auto)[];
}

export const AutoForm: FC<Props> = ({ 
  isEditing = false, 
  onSuccess,
  onError,
  initialData,
  disabledFields = []
}) => {
  const initialState: Omit<Auto, "id"> = {
    patente: "",
    marca: "",
    modelo: "",
    anio: 0,
    color: "",
    nroDeChasis: "",
    motor: "",
    duenioId: "",
    ...initialData
  };

  const [form, setForm] = useState<Omit<Auto, "id">>(initialState);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [personasRes, autoRes] = await Promise.all([
          getPersonas(),
          isEditing && id ? getAutoById(id) : Promise.resolve(null)
        ]);

        setPersonas(personasRes.data);

        if (isEditing && id && autoRes) {
          const auto = autoRes.data;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _, ...autoData } = auto;
          setForm(autoData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        onError?.(error as Error);
        navigate("/autos", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isEditing, id, navigate, onError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newValue = name === "anio" ? Number(value) : value;
      if (prev[name as keyof typeof prev] !== newValue) {
        setHasChanges(true);
      }
      return {
        ...prev,
        [name]: newValue
      };
    });
  };

  const validateForm = (): boolean => {
    if (!form.patente || !form.marca || !form.modelo || !form.duenioId) {
      alert("Por favor complete todos los campos requeridos, no sea imbecil !");
      return false;
    }
    if (form.anio < 1900 || form.anio > new Date().getFullYear() + 1) {
      alert("El año del auto no es válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditing && id) {
        await updateAuto(id, { ...form, id } as Auto);
        onSuccess?.();
      } else {
        await createAuto(form);
        onSuccess?.();
      }
      navigate("/autos", { replace: true });
    } catch (error) {
      console.error("Error saving auto:", error);
      onError?.(error as Error);
      alert("Error al guardar el auto. Reintente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">{isEditing ? "Editar Auto" : "Nuevo Auto"}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Datos bsicos */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Patente <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("patente") ? "bg-light" : ""}`}
                  name="patente"
                  value={form.patente}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  disabled={disabledFields.includes("patente")}
                />
              </div>
              
              <div className="col-md-4">
                <label className="form-label fw-bold">Marca <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("marca") ? "bg-light" : ""}`}
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("marca")}
                />
              </div>
              
              <div className="col-md-4">
                <label className="form-label fw-bold">Modelo <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("modelo") ? "bg-light" : ""}`}
                  name="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("modelo")}
                />
              </div>
            </div>

            {/* Mas tecnicos */}
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-bold">Año <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className={`form-control ${disabledFields.includes("anio") ? "bg-light" : ""}`}
                  name="anio"
                  value={form.anio}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  disabled={disabledFields.includes("anio")}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label fw-bold">Color <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("color") ? "bg-light" : ""}`}
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("color")}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label fw-bold">N° Chasis <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("nroDeChasis") ? "bg-light" : ""}`}
                  name="nroDeChasis"
                  value={form.nroDeChasis}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("nroDeChasis")}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label fw-bold">Motor <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${disabledFields.includes("motor") ? "bg-light" : ""}`}
                  name="motor"
                  value={form.motor}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("motor")}
                />
              </div>
            </div>

            {/* Dueño */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Dueño <span className="text-danger">*</span></label>
                <select
                  className={`form-select ${disabledFields.includes("duenioId") ? "bg-light" : ""}`}
                  name="duenioId"
                  value={form.duenioId}
                  onChange={handleChange}
                  required
                  disabled={disabledFields.includes("duenioId") || personas.length === 0}
                >
                  <option value="">{personas.length ? "Seleccione un dueño" : "Cargando dueños..."}</option>
                  {personas.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} {p.apellido} (DNI: {p.dni})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Acciones */}
            <div className="d-flex justify-content-end gap-2">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => navigate("/autos")}
                disabled={loading}
              >
                Cancelar
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !hasChanges}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {isEditing ? "Actualizando..." : "Creando..."}
                  </>
                ) : isEditing ? "Actualizar Auto" : "Crear Auto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};