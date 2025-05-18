import { Professor } from "@/types";

export default function ProfessorCard({ professor }: { professor: Professor }) {
  return (
    <div className="card-professor">
      <div className="avatar">{professor.nome.slice(0, 2).toUpperCase()}</div>
      <div>
        <h3>{professor.nome}</h3>
        <p><strong>Disponibilidade:</strong> {professor.disponibilidade}</p>
        <p><strong>Áreas:</strong> {professor.areasDeInteresse?.map(a => a.nome).join(", ")}</p>
        <p><strong>Lattes:</strong> <a href={professor.idLattes} target="_blank">{professor.idLattes}</a></p>
        <button>Mensagem</button>
        <button>Visualizar</button>
      </div>
    </div>
  );
}
