import { Auto } from "./auto";

export interface Persona {
  email: string;
  telefono: string;
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: Date;
  genero: string;
  donante: boolean;
  autos?: Auto[];
}
