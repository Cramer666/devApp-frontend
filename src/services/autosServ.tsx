import { entidadesApp } from "../api/api";
import { Auto } from "../models/auto";

export const getAutos = () => entidadesApp.get<Auto[]>('/autos');
export const createAuto = (auto: Omit<Auto, "id">) => entidadesApp.post('/autos', auto);
export const updateAuto = (id: string, auto: Auto) => entidadesApp.put(`/autos/${id}`, auto);
export const deleteAuto = (id: string) => entidadesApp.delete(`/autos/${id}`);
export const getAutoById = async (id: string): Promise<Auto> => {
  try {
    const response = await entidadesApp.get<Auto>(`/autos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching auto with id ${id}:`, error);
    throw new Error(`Auto con ID ${id} no encontrado`);
  }
};
