import styles from "../perfil.module.scss";
import { StatusTipo, AreaInteresse } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";
import AreaInteresseBadge from "@/components/AreaInteresseBadge";

interface CardTemaProps {
  areasInteresse?: AreaInteresse[] | null;
  onAdicionarArea: () => void;
  mostrarBotoes: boolean;
}

export default function CardTema({ areasInteresse, mostrarBotoes, onAdicionarArea }: CardTemaProps) {
  if (!areasInteresse || areasInteresse.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Áreas de Interesse</h2>
          </div>
          <p>Não possui áreas de interesse cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Áreas de Interesse" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarArea} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_areasInteresse}>
      <div className={styles.titulo}>
        <h2>Áreas de Interesse</h2>
      </div>

      <ul className={styles.lista_areasInteresse}>
        {areasInteresse
          ?.slice()
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((areaInteresse, idx) => (
          <li key={idx} className={styles.tema}>
            <AreaInteresseBadge 
              nome={areaInteresse.nome} 
              style={mostrarBotoes ? "myBadge" : "badge"} 
              mostrarBotao={mostrarBotoes}
              />
          </li>
        ))
        }
        {mostrarBotoes && (
          <button className={styles.adicionar} onClick={onAdicionarArea}>Adicionar áreas de interesse</button>
        )}
      </ul>
    </div>
  );
}
