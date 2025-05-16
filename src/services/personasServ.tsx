import { entidadesApp  } from "../api/api";
import { Persona } from "../models/persona";

export const getPersonas = () => entidadesApp.get<Persona[]>("/personas");
export const getPersona = (id: number) => entidadesApp.get<Persona>(`/personas/${id}`);
export const createPersona = (persona: Omit<Persona, "id">) => entidadesApp.post("/personas", persona);
export const updatePersona = (id: number, persona: Persona) => entidadesApp.put(`/personas/${id}`, persona);
export const deletePersona = (id: number) => entidadesApp.delete(`/personas/${id}`);

