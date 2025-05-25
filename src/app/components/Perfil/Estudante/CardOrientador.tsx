import styles from "../perfil.module.scss";
import { Estudante, Professor, ProfessorCurso, UsuarioCompleto } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import ButtonAuth from "@/components/ButtonAuth";
import Link from "next/link";
import UsuarioProfile from "@/components/UsuarioProfile";
import { SquareArrowOutUpRight } from "lucide-react";
import CardProfessor from "@/components/CardProfessor";

type StatusTipo = 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO';

interface CardOrientadorProps {
  usuario?: Estudante;
  orientador?: Professor | ProfessorCurso | null;
  mostrarBotoes: boolean;
}

export default function CardOrientador({ usuario, orientador, mostrarBotoes }: CardOrientadorProps) {

  return ( 
    <div className={styles.card_orientador}>
      <h2>Orientador</h2>
      {orientador ? (
        <CardProfessor professor={orientador} />
        ) : (
          <>
            <p>Não possui orientador.</p>
            <Link href="/professores">
              {mostrarBotoes && (
                <ButtonAuth text="Buscar orientador" type="button" theme="primary" margin="2rem 0 0 0"/>
              )}
            </Link>
          </>
      )}
    </div>
  );
}
