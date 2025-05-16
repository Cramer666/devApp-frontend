import { entidadesApp } from "../api/api";
import { Auto } from "../models/auto";
import { AutoConDuenio } from "../models/autoDuenio";

export const getAutos = () => entidadesApp.get<Auto[]>("/autos");
export const getAutosConDuenio = () => entidadesApp.get<AutoConDuenio[]>("/autos/withOwners");export const getAuto = (id: number) => entidadesApp.get<Auto>(`/autos/${id}`);
export const createAuto = (auto: Omit<Auto, "id">) => entidadesApp.post("/autos", auto);
export const updateAuto = (id: number, auto: Auto) => entidadesApp.put(`/autos/${id}`, auto);
export const deleteAuto = (id: string) => entidadesApp.delete(`/autos/${id}`);
