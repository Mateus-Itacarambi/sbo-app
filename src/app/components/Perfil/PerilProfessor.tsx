import CardInfo from "./CardInfo";
import CardTema from "./CardTema";
import CardOrientador from "./CardOrientador";

import { Estudante, Professor } from "@/types";
import { FC } from "react";

interface PerfilEstudanteProps {
  professor: Professor;
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
  professor,
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
    <CardInfo titulo="ID Lattes" texto={professor.idLattes} />

    {/* <CardTema
      usuario={estudante}
      onEditar={onEditarTema}
      onRemover={onRemoverTema}
      onAdicionarEstudante={onAdicionarEstudante}
      onRemoverEstudante={onRemoverEstudante}
      onCancelarOrientação={onCancelarOrientacao}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil}
    />

    <CardOrientador usuario={estudante} orientador={orientador} mostrarBotoes={isMeuPerfil} /> */}
  </>
);

export default PerfilEstudante;
