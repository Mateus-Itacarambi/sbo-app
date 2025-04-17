import {useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "./modalEditarPerfil.module.scss";


interface ModalEditarPerfilProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalEditarPerfil({ onClose, children }: ModalEditarPerfilProps) {
    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
