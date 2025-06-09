import { Auto } from "./auto";
import { genero } from "./generoEnum";

export interface Persona {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: genero ;
    donante: boolean;
    vehiculo: Auto[];
}
