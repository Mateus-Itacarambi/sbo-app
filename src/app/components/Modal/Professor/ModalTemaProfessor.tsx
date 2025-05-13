import styles from "../modal.module.scss";

import { TemaDTO } from "@/types";
import Modal from "../Modal";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useTema } from "@/hooks";

interface ModalTemaProfessorProps {
  onClose: () => void;
  onSalvar: (tema: TemaDTO) => void;
  onCancelar: () => void;
}

export default function ModalTemaProfessor({ onSalvar, onClose, onCancelar }: ModalTemaProfessorProps) {
  const tema = useTema();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoTema: TemaDTO = {
      titulo: tema.temaTitulo,
      descricao: tema.temaDescricao,
      palavrasChave: tema.temaPalavrasChave,
    };

    onSalvar(novoTema);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Adicionar Tema</h2>

      <form onSubmit={handleSubmit}>
        <InputAuth label="Título" type="text" value={tema.temaTitulo} onChange={(e) => tema.setTemaTitulo(e.target.value)} />
        <InputAuth label="Palavras-Chave" type="text" value={tema.temaPalavrasChave} onChange={(e) => tema.setTemaPalavrasChave(e.target.value)} />
        <InputAuth label="Descrição" type="textarea" value={tema.temaDescricao} onChange={(e) => tema.setTemaDescricao(e.target.value)} />

        <div className={styles.flex}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} margin="0" />
          <ButtonAuth type="submit" text={"Adicionar Tema"} theme="primary" margin="0" />
        </div>
      </form>
    </Modal>
  );
}
