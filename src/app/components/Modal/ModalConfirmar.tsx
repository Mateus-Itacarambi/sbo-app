import ButtonAuth from "@/components/ButtonAuth";
import Modal from "./Modal";

interface ModalConfirmarTemaProps {
  onClose: () => void;
  handleRemoverTema: () => void;
  isLoading: boolean;
}

export default function ModalConfirmarTema({ onClose, handleRemoverTema, isLoading }: ModalConfirmarTemaProps) {
  return (
    <Modal onClose={onClose}>
        <h2>Remover Tema</h2>
        <p>Tem certeza que deseja remover este tema?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="0"/>
        <ButtonAuth text={isLoading ? <span className="spinner"></span> : "Confirmar"} type="button" onClick={handleRemoverTema} theme="primary"  margin="0"/>
        </div>
    </Modal>
  );
}
