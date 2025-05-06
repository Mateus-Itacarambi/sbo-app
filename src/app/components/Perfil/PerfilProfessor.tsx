import CardInfo from "./CardInfo";
import CardTema from "./CardTema";
import CardOrientador from "./CardOrientador";

import { Professor } from "@/types";
import { FC } from "react";
import CardFormacao from "./CardFormacao";

interface PerfilProfessorProps {
  professor: Professor;
  orientador: Professor;
  onGerenciar: () => void;
  onRemoverTema: () => void;
  onAdicionarFormacao: () => void;
  onRemoverEstudante: () => void;
  onCancelarOrientacao: () => void;
  onAdicionarTema: () => void;
  isMeuPerfil: boolean;
}

const PerfilProfessor: FC<PerfilProfessorProps> = ({
  professor,
  orientador,
  onGerenciar,
  onRemoverTema,
  onAdicionarFormacao,
  onRemoverEstudante,
  onCancelarOrientacao,
  onAdicionarTema,
  isMeuPerfil,
}) => (
  <>
    <CardInfo titulo="ID Lattes" texto={professor.idLattes} />

    <CardFormacao 
      formacoes={professor.formacoes} 
      onGerenciar={onGerenciar}
      onRemover={onRemoverTema}
      onAdicionarFormacao={onAdicionarFormacao}
      onRemoverEstudante={onRemoverEstudante}
      onCancelarOrientação={onCancelarOrientacao}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil} 
    />

    {/* <CardTema
      usuario={estudante}
      onGerenciar={onGerenciarFormacao}
      onRemover={onRemoverTema}
      onAdicionarFormacao={onAdicionarFormacao}
      onRemoverEstudante={onRemoverEstudante}
      onCancelarOrientação={onCancelarOrientacao}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil}
    />

    <CardOrientador usuario={estudante} orientador={orientador} mostrarBotoes={isMeuPerfil} /> */}
  </>
);

export default PerfilProfessor;
