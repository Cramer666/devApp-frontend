import axios from "axios";
import { Auto } from "../models/auto";

const API_URL = "http://localhost:3000/autos";

export const getAutos = () => axios.get<Auto[]>(API_URL);
export const getAutoById = (id: string) => axios.get<Auto>(`${API_URL}/${id}`);
export const createAuto = (auto: Omit<Auto, "id">) => axios.post(API_URL, auto);
export const updateAuto = (id: string, auto: Omit<Auto, "id">) => axios.put(`${API_URL}/${id}`, auto);
export const deleteAuto = (id: string) => axios.delete(`${API_URL}/${id}`);

