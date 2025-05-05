import styles from "./perfil.module.scss";
import { getInitials } from "@/utils/getInitials";
import { Estudante, Professor, UsuarioNaoEncontrado, UsuarioCompleto } from "@/types";
import Image from "next/image";

interface PerfilCabecalhoProps {
  usuario: UsuarioCompleto | UsuarioNaoEncontrado;
  onEditar: () => void;
  mostrarBotoes: boolean;
}

export default function PerfilCabecalho({ usuario, onEditar, mostrarBotoes }: PerfilCabecalhoProps) {
  return (
    <div className={styles.card_perfil}>
        <div className={styles.profile}>
            {usuario.profileImage ? (
            <Image src={usuario.profileImage} alt="Foto de perfil" width={100} height={100} className={styles.profileImage} />
            ) : (
            <div className={styles.initials}>{getInitials(usuario.nome)}</div>
            )}
        </div>
        <div className={styles.detalhes}>
            <h1>{usuario.nome}</h1>
            <p>{usuario.email}</p>
            {usuario.role === "ESTUDANTE" && <p>{(usuario as Estudante).curso?.nome} - {(usuario as Estudante).semestre}º semestre</p>}
            {usuario.role === "PROFESSOR" && <p>{(usuario as Professor).disponibilidade}</p>}
        </div>
        {mostrarBotoes && (
          <div className={styles.editar}>
            <button className={styles.editBtn} onClick={onEditar}>Editar</button>
          </div>
        )}
    </div>
  );
}
