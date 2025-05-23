import styles from "./curso.module.scss";

interface Professor {
  id: number;
  nome: string;
  email: string;
}

interface Curso {
  id: number;
  nome: string;
  sigla: string;
  descricao: string;
  semestres: number;
  professores: Professor[];
}

interface CursoPerfilProps {
  curso: Curso;
}

export default function CursoPerfil({ curso }: CursoPerfilProps) {
  return (
    <section className={styles.curso_perfil}>
      <h1>{curso.nome} <span className={styles.sigla}>({curso.sigla})</span></h1>
      <p className={styles.descricao}>{curso.descricao}</p>

      <div className={styles.info}>
        <strong>Quantidade de semestres:</strong> {curso.semestres}
      </div>

      <div className={styles.professores}>
        <h2>Professores Vinculados</h2>
        {curso.professores.length === 0 ? (
          <p>Nenhum professor vinculado a este curso.</p>
        ) : (
          <ul>
            {curso.professores.map((prof) => (
              <li key={prof.id}>
                <strong>{prof.nome}</strong> — {prof.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
