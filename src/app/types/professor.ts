import { Usuario, Curso, Tema, AreaInteresse, Formacao } from "./index";

export interface Professor extends Usuario {
  idLattes: string;
  disponibilidade: string;
  cursos?: Curso[] | null;
  areasDeInteresse?: AreaInteresse[] | null;
  formacoes?: Formacao[] | null;
  temas?: Tema[] | null;
}
