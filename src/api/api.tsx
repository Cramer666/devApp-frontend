import axios from "axios";

export const entidadesApp = axios.create({
    baseURL: 'http://localhost:3000',
});