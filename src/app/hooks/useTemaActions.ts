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

export const useTemaActions = () => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleCadastrarTema = async (e: React.FormEvent, idEstudante: number, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await cadastrarTema(e, idEstudante, dados);
      localStorage.setItem("mensagemSucesso", "Tema cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAtualizarTema = async (e: React.FormEvent, idTema: number, idEstudante: number, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await atualizarTema(e, idTema, idEstudante, dados);
      localStorage.setItem("mensagemSucesso", "Tema atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverTema = async (idTema: number, idEstudante: number) => {
    try {
      setIsLoading(true);
      await removerTema(idTema, idEstudante);
      localStorage.setItem("mensagemSucesso", "Tema removido com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdicionarEstudanteTema = async (e: React.FormEvent, idTema: number, idEstudante: number, matricula: string) => {
    try {
      setIsLoading(true);
      await adicionarEstudanteTema(e, idTema, idEstudante, matricula);
      localStorage.setItem("mensagemSucesso", "Estudante adicionado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverEstudanteTema = async (e: React.FormEvent, idTema: number, idEstudante: number, matricula: string) => {
    try {
      setIsLoading(true);
      await removerEstudanteTema(e, idTema, idEstudante, matricula);
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
