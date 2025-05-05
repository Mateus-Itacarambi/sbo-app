import styles from "./perfil.module.scss";
import { Estudante, Professor, UsuarioCompleto } from "@/types";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";
import ButtonAuth from "@/components/ButtonAuth";
import { getInitials } from "@/utils/getInitials";
import Link from "next/link";

type StatusTipo = 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO';

interface CardOrientadorProps {
  usuario: UsuarioCompleto;
  orientador: Professor;
  mostrarBotoes: boolean;
}

export default function CardOrientador({ usuario, orientador, mostrarBotoes }: CardOrientadorProps) {

  return ( 
    <div className={styles.card_orientador}>
      <h2>Orientador</h2>
      {(usuario as Estudante).tema?.professor ? (
          <div className={styles.card_perfil}>
            <div className={styles.profile}>
              {orientador?.profileImage ? (
                <Image src={orientador?.profileImage} alt="Foto de perfil" width={100} height={100} className={styles.profileImage} />
              ) : (
                <div className={styles.initials}>{getInitials(orientador?.nome)}</div>
              )}
            </div>
              <div className={styles.detalhes}>
                <h1>{orientador?.nome}</h1>
                <p>{orientador?.email}</p>
                {orientador?.disponibilidade && (
                    <StatusBadge status={orientador?.disponibilidade as StatusTipo} />
                )}
              </div>
              <div className={styles.editar}>
                <button className={styles.editBtn}>Visualizar</button>
              </div>
          </div>
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
