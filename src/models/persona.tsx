import { Auto } from "./auto";

type  Genero = 'Masculino' | 'Femenino' | 'No binario';

export interface Persona {
    id: string;
    nombre: string;
    apellido: string;
    DNI: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    donante: boolean;
    vehiculo: Auto[];
}
