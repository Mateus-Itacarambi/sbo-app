import styles from "../perfil.module.scss";
import { Professor, Tema } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";

interface CardTemaProps {
  temas?: Tema[] | null;
  onGerenciar: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
}

export default function CardTema({ temas, mostrarBotoes, onGerenciar, onAdicionarTema }: CardTemaProps) {
  if (!temas || temas.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Temas</h2>
          </div>
          <p>Não possui temas cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Tema" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarTema} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_formacao}>
      <div className={styles.titulo}>
        <h2>Temas</h2>
        {mostrarBotoes && (
          <Dropdown
            label=""
            width="17rem"
            top="2rem"
            icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
            items={[
              { type: "link", label: "", href: "" },
              { type: "action", label: "Adicionar Tema", onClick: onAdicionarTema },
              { type: "action", label: "Gerenciar Temas", onClick: onGerenciar },
            ]}
          />
        )}
      </div>

      {/* <ul className={styles.lista_formacoes}>
        {temas
          ?.slice()
          .sort((a, b) => a.titulo.localeCompare(b.titulo))
          .map((formacao, idx) => (
          <li key={idx} className={styles.card_formacao}>
            <div className={styles.periodo}>
              <p>
                <strong>{formacao.anoInicio}</strong>
                <strong>–</strong>
                <strong>{formacao.anoFim}</strong>
              </p>
            </div>
            <div className={styles.formacao}>
              <p><strong>{formacao.curso}</strong></p>
              <p><strong>{formacao.instituicao}</strong></p>
              <p><strong>Título: </strong>{formacao.titulo}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
