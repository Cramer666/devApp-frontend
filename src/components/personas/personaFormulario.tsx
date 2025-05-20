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
        dni: "",
        telefono: "",
        email: "",
        fechaDeNacimiento: new Date(),
        genero: "",
        donante: false,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        if (!form.nombre || !form.apellido || !form.dni) {
            alert("Por favor complete todos los campos requeridos");
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
                await updatePersona(id, form);
                onSuccess?.();
            } else {
                await createPersona(form);
                onSuccess?.();
            }
            navigate("/personas", { replace: true });
        } catch (error) {
            console.error("Error saving persona:", error);
            onError?.(error as Error);
            alert("Error al guardar la persona. Por favor intente nuevamente.");
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
                    <h3 className="mb-0">{isEditing ? "Editar Persona" : "Nueva Persona"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Grupo 1: Datos básicos */}
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

                        {/* Grupo 2: Documentación */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">DNI <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${disabledFields.includes("dni") ? "bg-light" : ""}`}
                                    name="dni"
                                    value={form.dni}
                                    onChange={handleChange}
                                    required
                                    disabled={disabledFields.includes("dni")}
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Teléfono</label>
                                <input
                                    type="tel"
                                    className={`form-control ${disabledFields.includes("telefono") ? "bg-light" : ""}`}
                                    name="telefono"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    disabled={disabledFields.includes("telefono")}
                                />
                            </div>
                        </div>

                        {/* Grupo 3: Contacto */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${disabledFields.includes("email") ? "bg-light" : ""}`}
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    disabled={disabledFields.includes("email")}
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Género</label>
                                <input
                                    type="text"
                                    className={`form-control ${disabledFields.includes("genero") ? "bg-light" : ""}`}
                                    name="genero"
                                    value={form.genero}
                                    onChange={handleChange}
                                    disabled={disabledFields.includes("genero")}
                                />
                            </div>
                        </div>

                        {/* Grupo 4: Otros datos */}
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
                                    <label className="form-check-label fw-bold">Donante de órganos</label>
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