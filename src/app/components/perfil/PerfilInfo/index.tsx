"use client";

import styles from "./navbar.module.scss";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const { usuario } = useAuth();
    const router = useRouter();

    if (!usuario) {
        router.push("/login");
    }

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
      <div className={styles.editar}>
        <button className={styles.editBtn} onClick={() => setModalEditarPerfilAberto(true)}>Editar</button>
      </div>
    </div>
  );
};

export default NavBar;
