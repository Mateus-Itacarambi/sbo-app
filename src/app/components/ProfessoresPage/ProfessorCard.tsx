import { Professor } from "@/types";
import styles from "./professoresPage.module.scss";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";
import { Check, X } from "lucide-react";

export default function ProfessorCard({ professor }: { professor: Professor }) {
  return (
    <div className={styles.card_professor}>
        <div className={styles.profile}>
            {professor.profileImage ? (
            <Image src={professor.profileImage} alt="Foto de perfil" width={100} height={100} className={styles.profileImage} />
            ) : (
            <div className={styles.initials}>
              {getInitials(professor.nome)}

              {professor.disponibilidade === "DISPONIVEL" ? (
                <div className={`${styles.status} ${styles.disponivel}`}>
                  <Check size={"15px"} strokeWidth={"4px"} />
                </div>
              ) : professor.disponibilidade === "INDISPONIVEL" ? (
                <div className={`${styles.status} ${styles.indisponivel}`}>
                  <X size={"15px"} strokeWidth={"4px"} />
                </div>
              ) : (
                ""
              )}
            </div>
            )}
        </div>
      <div className={styles.info}>
        <h3>{professor.nome}</h3>
        <p className={styles.email}>{professor.email}</p>
        <p className={styles.areas}>
          <strong>Áreas de Interesse:</strong> 
          {professor.areasDeInteresse?.map(a => a.nome).join(", ")}
        </p>
        <p className={styles.cursos}><strong>Cursos:</strong> {professor.cursos?.map(a => a.nome).join(", ")}</p>
        <p><strong>Lattes:</strong> <a href={professor.idLattes} target="_blank">{professor.idLattes}</a></p>
        <button>Mensagem</button>
        <button>Visualizar</button>
      </div>
    </div>
  );
}
