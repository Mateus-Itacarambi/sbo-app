import React from "react";
import { Estudante } from "@/types/estudante";
import { Professor } from "@/types/professor";
import styles from "./modalEditarPerfil.module.scss";
import InputAuth from "../InputAuth";
import ButtonAuth from "../ButtonAuth";

type UsuarioCompleto = Estudante | Professor;

interface ModalEditarPerfilProps {
  usuario: UsuarioCompleto;
  onChange: (field: string, value: string | number) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalEditarPerfil({ usuario, onChange, onClose, onSave }: ModalEditarPerfilProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Editar Perfil</h2>
        <form onSubmit={onSave}>
        <InputAuth
          label="Nome"
          type="text"
          value={usuario.nome}
          onChange={(e) => onChange("nome", e.target.value)}
        />

        <InputAuth
          label="Gênero"
          type="text"
          value={usuario.genero}
          onChange={(e) => onChange("genero", e.target.value)}
        />

        {"matricula" in usuario && (
          <InputAuth
            label="Matrícula"
            type="text"
            value={usuario.matricula}
            onChange={(e) => onChange("matricula", e.target.value)}
          />
        )}

        {"idLattes" in usuario && (
          <InputAuth
            label="ID Lattes"
            type="text"
            value={usuario.idLattes}
            onChange={(e) => onChange("idLattes", e.target.value)}
          />
        )}

        <div className={styles.buttons}>
            <ButtonAuth type="submit" text="Salvar" theme="primary" onClick={onSave} />
            <ButtonAuth type="button" text="Cancelar" theme="primary" onClick={onClose} />
        </div>
        </form>
      </div>
    </div>
  );
}
