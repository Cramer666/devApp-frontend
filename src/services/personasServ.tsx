import axios from "axios";
import { Persona } from "../models/persona";

const API_URL = "http://localhost:3000/personas";

type PersonaFromApi = Omit<Persona, "id"> & { _id: string };

export const getPersonas = () =>
  axios.get<PersonaFromApi[]>(API_URL).then(res => {
    const personasConId: Persona[] = res.data.map(p => ({
      ...p,
      id: p._id
    }));
    return { ...res, data: personasConId };
  });

export const getPersonaById = (id: string) =>
  axios.get<PersonaFromApi>(`${API_URL}/${id}`).then(res => {
    const persona: Persona = {
      ...res.data,
      id: res.data._id
    };
    return { ...res, data: persona };
  });

export const createPersona = (persona: Omit<Persona, "id">) =>
  axios.post(API_URL, persona);

export const updatePersona = (id: string, persona: Omit<Persona, "id">) =>
  axios.put(`${API_URL}/${id}`, persona);

export const deletePersona = (id: string) =>
  axios.delete(`${API_URL}/${id}`);
