export interface Usuario {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string;
    genero: string;
    role?: string;
    profileImage?: string;
  }