import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";

import {
  solicitarOrientacao,
  cancelarOrientacao,
  rejeitarSolicitacao,
  aprovarSolicitacao,
} from "@/services/solicitacaoService";


export const useSolicitacaoActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleSolicitarOrientacao = async (professorId: number) => {
    try {
      setIsLoading(true);
      await solicitarOrientacao(usuario, professorId);
      setSucesso("Solicitacão enviada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAprovarSolicitacao = async (solicitacaoId: number) => {
    try {
      setIsLoading(true);
      await aprovarSolicitacao(usuario, solicitacaoId);
      setSucesso("Solicitacão aprovada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejeitarSolicitacao = async (e: React.FormEvent, solicitacaoId: number, motivo: string) => {
    try {
      setIsLoading(true);
      await rejeitarSolicitacao(e, solicitacaoId, motivo);
      setSucesso("Solicitacão rejeitada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelarOrientacao = async (e: React.FormEvent, solicitacaoId: number, motivo: string) => {
    try {
      setIsLoading(true);
      await cancelarOrientacao(e, solicitacaoId, motivo);
      localStorage.setItem("mensagemSucesso", "Orientação cancelada com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    handleSolicitarOrientacao,
    handleAprovarSolicitacao,
    handleRejeitarSolicitacao,
    handleCancelarOrientacao,
  };
};
