import { useEffect, useState } from "react";
import { Persona } from "../../models/persona";
import { getPersonas, deletePersona, createPersona, updatePersona } from "../../services/personasServ";
import { PersonaForm } from "./personaFormulario";
import { PersonaTable } from "./personaTabla";

export const PersonaList = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [editando, setEditando] = useState<Persona | null>(null);

  const cargar = () => {
    getPersonas().then(res => setPersonas(res.data));
  };

  useEffect(cargar, []);

  const handleSubmit = (p: Omit<Persona, "id">) => {
    if (editando) {
      updatePersona(editando.id, { ...editando, ...p }).then(() => {
        cargar();
        setEditando(null);
      });
    } else {
      createPersona(p).then(cargar);
    }
  };

  return (
    <div>
      <h3>{editando ? "Editar persona" : "Agregar persona"}</h3>
      <PersonaForm
        key={editando?.id ?? "nueva"}
        onSubmit={handleSubmit}
        initial={editando ?? undefined}
      />
      {editando && (
        <button className="btn btn-secondary mb-3" onClick={() => setEditando(null)}>
          Cancelar edición
        </button>
      )}
      <hr />
      <PersonaTable
        personas={personas}
        onEdit={setEditando}
        onDelete={p => deletePersona(p.id).then(cargar)}
      />
    </div>
  );
};
