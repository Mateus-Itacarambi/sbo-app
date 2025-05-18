import { X, Search } from "lucide-react"; // ícones de lupa e "x"
import ButtonAuth from "../ButtonAuth";
import styles from "./professoresPage.module.scss";

interface Props {
  filtros: any;
  setFiltros: (f: any) => void;
}

export default function FiltroProfessor({ filtros, setFiltros }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparCampoNome = () => {
    setFiltros({ ...filtros, nome: "" });
  };

  return (
    <aside className={styles.card_filtro}>
      <div className={styles.filtros}>
        <h2>Filtros</h2>

        <div className={styles.inputComIcone}>
          <input
            name="nome"
            placeholder="Nome"
            value={filtros.nome}
            onChange={handleChange}
          />
          {filtros.nome ? (
            <X className={styles.icone} onClick={limparCampoNome} />
          ) : (
            <Search className={styles.icone} />
          )}
        </div>

        <select name="curso" onChange={handleChange}><option value="">Curso</option></select>
        <select name="disponibilidade" onChange={handleChange}><option value="">Disponibilidade</option></select>
        <select name="areaInteresse" onChange={handleChange}><option value="">Área de interesse</option></select>
      </div>

      <ButtonAuth
        type="button"
        text="Cancelar"
        theme="secondary"
        margin="0"
        onClick={() =>
          setFiltros({ nome: "", curso: "", disciplina: "", disponibilidade: "", areaInteresse: "" })
        }
      />
    </aside>
  );
}
