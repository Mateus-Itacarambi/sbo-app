import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { Formacao, Professor } from "@/types";

import {
  adicionarFormacao,
  atualizarFormacao,
} from "@/services/formacaoService";

export const useFormacaoActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAdicionarFormacao = async (dados: Formacao) => {
    try {
      setIsLoading(true);
      await adicionarFormacao(usuario, dados);
      localStorage.setItem("mensagemSucesso", "Formação cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAtualizarFormacao = async (formacaoId: number, dados: Formacao) => {
    try {
      setIsLoading(true);
      await atualizarFormacao(formacaoId, dados);
      localStorage.setItem("mensagemSucesso", "Formação atualizada com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAdicionarFormacao,
    handleAtualizarFormacao,
  };
};
