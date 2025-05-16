export interface Curso {
    id: number;
    nome: string;
    sigla: string;
    descricao: string;
    semestres: number;
}

export interface CursoProfessor {
    id: number;
    nome: string;
}