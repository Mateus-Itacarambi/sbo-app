import { Usuario } from "./usuario";
import { Curso } from "./curso";
import { Tema } from "./tema";
import { AreaInteresse } from "./areaInteresse";

export interface Professor extends Usuario {
  idLattes: string;
  disponibilidade: string;
  cursos?: Curso[] | null;
  areasDeInteresse?: AreaInteresse[] | null;
  temas?: Tema[] | null;
}
