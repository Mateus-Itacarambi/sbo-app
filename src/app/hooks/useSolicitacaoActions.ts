import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { Estudante } from "@/types";

import {
  solicitarOrientacao,
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
  
  return {
    handleSolicitarOrientacao,
  };
};
