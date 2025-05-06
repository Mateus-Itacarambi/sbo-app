import styles from "./perfil.module.scss";
import { Professor, Formacao } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";

interface CardFormacaoProps {
  formacoes?: Formacao[] | null;
  onGerenciar: () => void;
  onRemover: () => void;
  onAdicionarFormacao: () => void;
  onRemoverEstudante: () => void;
  onCancelarOrientação: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
}

export default function CardFormacao({ formacoes, mostrarBotoes, onGerenciar, onRemover, onAdicionarFormacao, onRemoverEstudante, onCancelarOrientação, onAdicionarTema }: CardFormacaoProps) {
  if (!formacoes || formacoes.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <h2>Formação/Titulação acadêmica</h2>
          <p>Não possui formações cadastrado.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Formação" type="button" theme="primary" onClick={onAdicionarFormacao} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_formacao}>
      <div className={styles.titulo}>
        <h2>Formação/Titulação acadêmica</h2>
        {mostrarBotoes && (
          <Dropdown
            label=""
            width="17rem"
            top="2rem"
            icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
            items={[
              { type: "link", label: "", href: "" },
              { type: "action", label: "Editar", onClick: onGerenciar },
              { type: "action", label: "Remover", onClick: onRemover },
              { type: "action", label: "Adicionar Formação", onClick: onAdicionarFormacao },
              { type: "action", label: "Remover Estudante", onClick: onRemoverEstudante },
              { type: "action", label: "Cancelar Orientação", onClick: onCancelarOrientação },
            ]}
          />
        )}
      </div>

      <ul className={styles.lista_formacoes}>
        {formacoes
          ?.slice()
          .sort((a, b) => a.anoInicio - b.anoInicio)
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
              <p><strong>{formacao.faculdade}</strong></p>
              <p><strong>Título: </strong>{formacao.titulo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
