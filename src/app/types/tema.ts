import { Estudante } from "./estudante";
import { Professor } from "./professor";

export interface Tema {
    id: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    areaConhecimento: string;
    status: string;
    professor: Professor;
    estudantes?: Estudante[];
}
  