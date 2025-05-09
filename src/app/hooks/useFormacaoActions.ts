import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { Formacao, FormacaoDTO, Professor } from "@/types";

import {
  adicionarFormacao,
  atualizarFormacao,
} from "@/services/formacaoService";

import { useFormacoes } from "@/hooks/useFormacoes";

export const useFormacaoActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const { setFormacoes } = useFormacoes();

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
  
  const handleAtualizarFormacao = async (formacaoId: number, dados: FormacaoDTO) => {
    try {
      setIsLoading(true);
      const formacaoAtualizada = await atualizarFormacao(formacaoId, dados) as Formacao;
      setFormacoes((prev) =>
        prev.map((f) => (f.id === formacaoId ? formacaoAtualizada : f))
      );
      setSucesso("Formação atualizada com sucesso!");
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
