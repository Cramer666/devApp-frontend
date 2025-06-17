import axios from "axios";
import { Persona } from "../models/persona";
import { Auto } from "../models/auto";

//esta en api, tengo q importarlo desp, mas prolijo....
const API_URL = "http://localhost:3000/personas";


export const getPersonas = () => axios.get<Persona[]>(API_URL);
export const getPersonaById = (id: string) => axios.get<Persona>(`${API_URL}/${id}`);
export const listarAutosPorPersona = (personaId: string) =>  axios.get<Auto[]>(`${API_URL}/autos/${personaId}`);
export const createPersona = (persona: Omit<Persona, "id">) =>axios.post(API_URL, persona);
export const updatePersona = (id: string, persona: Omit<Persona, "id">) =>axios.put(`${API_URL}/${id}`, persona);
export const deletePersona = (id: string) =>axios.delete(`${API_URL}/${id}`);
