import CardInfo from "./CardInfo";
import CardTema from "./CardTema";
import CardOrientador from "./CardOrientador";

import { Estudante, Professor } from "@/types";
import { FC } from "react";

interface PerfilEstudanteProps {
  estudante: Estudante;
  orientador: Professor;
  onEditarTema: () => void;
  onRemoverTema: () => void;
  onAdicionarEstudante: () => void;
  onRemoverEstudante: () => void;
  onCancelarOrientacao: () => void;
  onAdicionarTema: () => void;
  isMeuPerfil: boolean;
}

const PerfilEstudante: FC<PerfilEstudanteProps> = ({
  estudante,
  orientador,
  onEditarTema,
  onRemoverTema,
  onAdicionarEstudante,
  onRemoverEstudante,
  onCancelarOrientacao,
  onAdicionarTema,
  isMeuPerfil,
}) => (
  <>
    <CardInfo titulo="Matrícula" texto={estudante.matricula} />

    <CardTema
      usuario={estudante}
      onEditar={onEditarTema}
      onRemover={onRemoverTema}
      onAdicionarEstudante={onAdicionarEstudante}
      onRemoverEstudante={onRemoverEstudante}
      onCancelarOrientação={onCancelarOrientacao}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil}
    />

    <CardOrientador usuario={estudante} orientador={orientador} mostrarBotoes={isMeuPerfil} />
  </>
);

export default PerfilEstudante;
