import { useApi } from "./useApi";
import { getPersonas } from "../services/personasServ";
import { Persona } from "../models/persona";

export const usePersonas = () => useApi<Persona[]>(getPersonas);