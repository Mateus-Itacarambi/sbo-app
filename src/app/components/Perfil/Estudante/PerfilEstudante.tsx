import CardInfo from "../CardInfo";
import CardTema from "./CardTema";
import CardOrientador from "./CardOrientador";

import { Estudante, Professor } from "@/types";

interface PerfilEstudanteProps {
  estudante: Estudante;
  orientador?: Professor | null;
  onEditarTema: () => void;
  onRemoverTema: (temaId: number) => void;
  onAdicionarEstudante: () => void;
  onRemoverEstudante: () => void;
  onCancelarOrientacao: (temaId: number, motivo: string) => void;
  onAdicionarTema: () => void;
  isMeuPerfil: boolean;
  isLoading: boolean;
}

export default function PerfilEstudante({
  estudante,
  orientador,
  onEditarTema,
  onRemoverTema,
  onAdicionarEstudante,
  onRemoverEstudante,
  onCancelarOrientacao,
  onAdicionarTema,
  isMeuPerfil,
  isLoading,
}: PerfilEstudanteProps) {
  const handleRemove = () => {
    if (estudante.tema?.id === undefined) {
      console.error("ID do tema não definido.");
      return;
    }

    onRemoverTema(estudante.tema?.id);
  };
  
  const handleCancelar = () => {
    if (estudante.tema?.id === undefined) {
      console.error("ID do tema não definido.");
      return;
    }

    onCancelarOrientacao(estudante.tema?.id, "");
  };
  return (
    <>
      <CardInfo titulo="Matrícula" texto={estudante.matricula} />

      <CardTema
        usuario={estudante}
        onEditar={onEditarTema}
        onRemover={handleRemove}
        onAdicionarEstudante={onAdicionarEstudante}
        onRemoverEstudante={onRemoverEstudante}
        onCancelarOrientação={handleCancelar}
        onAdicionarTema={onAdicionarTema}
        mostrarBotoes={isMeuPerfil}
        isLoading={isLoading}
      />

      <CardOrientador usuario={estudante} orientador={orientador} mostrarBotoes={isMeuPerfil} />
    </>
  );
}
