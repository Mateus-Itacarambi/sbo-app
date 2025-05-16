import { AreaInteresse, CursoProfessor } from '@/types';
import styles from './customBadge.module.scss';
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

interface CustomBadgeProps {
  areaInteresse?: AreaInteresse;
  curso?: CursoProfessor;
  style: string;
  mostrarBotao: boolean;
  onRemover: (id: number) => void;
}

export default function StatusBadge({ areaInteresse, curso, style, mostrarBotao, onRemover }: CustomBadgeProps) {
    return (
      <>
        {areaInteresse ? (
          <span className={`${styles[style]}`}>
            {areaInteresse.nome}
            {mostrarBotao && <button onClick={() => onRemover(areaInteresse.id)}>x</button>}
          </span>
        ) : curso ? (
          <span className={`${styles[style]}`}>
            <Link href={`/cursos/${curso.nome}`}>
              {curso.nome}
              <SquareArrowOutUpRight size={16}/>
            </Link>
            {mostrarBotao && <button onClick={() => onRemover(curso.id)}>x</button>}
          </span>
        ) : null}
      </>
    );
  }
