import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Persona } from "../../models/persona";
import { getPersonaById, createPersona, updatePersona } from "../../services/personasServ";

interface Props {
    isEditing?: boolean;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    initialData?: Omit<Persona, "id">;
    disabledFields?: (keyof Persona)[];
}

export const PersonaForm: FC<Props> = ({ 
    isEditing = false, 
    onSuccess,
    onError,
    initialData,
    disabledFields = []
}) => {
    const initialState: Omit<Persona, "id"> = {
        nombre: "",
        apellido: "",
        DNI: "",
        fechaDeNacimiento: new Date(),
        genero: "Masculino",
        donante: false,
        vehiculo: [],
        ...initialData
    };

    const [form, setForm] = useState<Omit<Persona, "id">>(initialState);
    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing && id) {
            setLoading(true);
            getPersonaById(id)
                .then(res => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id: _, ...personaData } = res.data;
                    setForm(personaData);
                })
                .catch(error => {
                    console.error("Error loading persona:", error);
                    onError?.(error as Error);
                    navigate("/personas", { replace: true });
                })
                .finally(() => setLoading(false));
        }
    }, [isEditing, id, navigate, onError]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const newValue = name === "donante" ? (e.target as HTMLInputElement).checked : value;
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
        if (!form.nombre || !form.apellido || !form.DNI) {
            alert("Por favor complete todos los campos requeridos");
            return false;
        }
        return true;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
            if (isEditing && id) {
                await updatePersona(id, form);
                onSuccess?.();
            } else {
                await createPersona(form);
                onSuccess?.();
            }
            navigate("/personas", { replace: true });
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
                    <h3 className="mb-0">{isEditing ? "Editar Persona" : "Nueva Persona"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Datos basicos */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${disabledFields.includes("nombre") ? "bg-light" : ""}`}
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled={disabledFields.includes("nombre")}
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Apellido <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${disabledFields.includes("apellido") ? "bg-light" : ""}`}
                                    name="apellido"
                                    value={form.apellido}
                                    onChange={handleChange}
                                    required
                                    disabled={disabledFields.includes("apellido")}
                                />
                            </div>
                        </div>

                        {/* DNI*/}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">DNI <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${disabledFields.includes("DNI") ? "bg-light" : ""}`}
                                    name="DNI"
                                    value={form.DNI}
                                    onChange={handleChange}
                                    required
                                    disabled={disabledFields.includes("DNI")}
                                />
                            </div>
                        </div>

                        {/* Género */}
                        <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Género <span className="text-danger">*</span></label>
                            <select
                            className={`form-select ${disabledFields.includes("genero") ? "bg-light" : ""}`}
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                            required
                            disabled={disabledFields.includes("genero")}
                            >
                            <option value="">Seleccione una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No binario">No binario</option>
                            </select>
                        </div>
                        </div>
                        {/* Otros datos */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    className={`form-control ${disabledFields.includes("fechaDeNacimiento") ? "bg-light" : ""}`}
                                    name="fechaDeNacimiento"
                                    value={form.fechaDeNacimiento instanceof Date ? form.fechaDeNacimiento.toISOString().split('T')[0] : form.fechaDeNacimiento}
                                    onChange={handleChange}
                                    disabled={disabledFields.includes("fechaDeNacimiento")}
                                />
                            </div>
                            
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className={`form-check-input ${disabledFields.includes("donante") ? "bg-light" : ""}`}
                                        name="donante"
                                        checked={form.donante as boolean}
                                        onChange={handleChange}
                                        disabled={disabledFields.includes("donante")}
                                    />
                                    <label className="form-check-label fw-bold">Donante</label>
                                </div>
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="d-flex justify-content-end gap-2">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/personas")}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading || (isEditing && !hasChanges)}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        {isEditing ? "Actualizando..." : "Creando..."}
                                    </>
                                ) : isEditing ? "Actualizar Persona" : "Crear Persona"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};