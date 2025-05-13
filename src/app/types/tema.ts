import { Estudante } from "./estudante";
import { Professor } from "./professor";

export interface Tema {
    id: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    statusTema: string;
    professor: Professor;
    estudantes?: Estudante[];
}
  
export interface TemaDTO {
    titulo: string;
    descricao: string;
    palavrasChave: string;
}