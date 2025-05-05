import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import {
  cadastrarTema,
  atualizarTema,
  removerTema,
  adicionarEstudanteTema,
  removerEstudanteTema,
  TemaPayload,
} from "@/services/temaService";

export const useTemaActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleCadastrarTema = async (e: React.FormEvent, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await cadastrarTema(e, usuario, dados);
      localStorage.setItem("mensagemSucesso", "Tema cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAtualizarTema = async (e: React.FormEvent, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await atualizarTema(e, usuario, dados);
      localStorage.setItem("mensagemSucesso", "Tema atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverTema = async () => {
    try {
      setIsLoading(true);
      await removerTema(usuario);
      localStorage.setItem("mensagemSucesso", "Tema removido com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdicionarEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    try {
      setIsLoading(true);
      await adicionarEstudanteTema(e, usuario, matricula);
      localStorage.setItem("mensagemSucesso", "Estudante adicionado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    try {
      setIsLoading(true);
      await removerEstudanteTema(e, usuario, matricula);
      localStorage.setItem("mensagemSucesso", "Estudante removido com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCadastrarTema,
    handleAtualizarTema,
    handleRemoverTema,
    handleAdicionarEstudanteTema,
    handleRemoverEstudanteTema,
  };
};
