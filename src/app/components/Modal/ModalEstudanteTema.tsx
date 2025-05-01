import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../InputAuth";
import Modal from "./Modal";

interface ModalEstudanteTemaProps {
  titulo: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  matricula: string;
  setMatricula: (value: string) => void;
  isLoading: boolean;
  textoBotao: string;
}

export default function ModalEstudanteTema({ titulo, onClose, onSubmit, matricula, setMatricula, isLoading, textoBotao }: ModalEstudanteTemaProps) {
  return (
    <Modal onClose={onClose}>
      <h2>{titulo}</h2>
      <form name="adicionar_estudante" onSubmit={onSubmit}>
        <InputAuth
          label="Matrícula"
          type="text"
          placeholder="Matrícula do estudante"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="0"/>
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : textoBotao} type="submit" theme="primary"  margin="0"/>
        </div>
      </form>
    </Modal>
  );
}
