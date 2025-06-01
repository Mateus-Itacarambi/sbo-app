import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";

import {
  solicitarOrientacao,
  cancelarOrientacao,
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

  const handleCancelarOrientacao = async (temaId: number, motivo: string) => {
    try {
      setIsLoading(true);
      await cancelarOrientacao(temaId, motivo);
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
    handleCancelarOrientacao,
  };
};
