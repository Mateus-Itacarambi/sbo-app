import { useAlertaTemporario } from "@/hooks/useAlertaTemporario";
import { handleFetchError } from "@/utils/handleFetchError";
import {
  cadastrarTema,
//   atualizarTema,
  removerTemaEstudante,
  listarTemasEstudante,
  TemaPayload,
} from "@/services/temaService";

export const useTemaActions = () => {
  const { erro, sucesso, isLoading, setErro, setSucesso, setIsLoading } = useAlertaTemporario();

  const handleCadastrarTema = async (e: React.FormEvent,idEstudante: number, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await cadastrarTema(e, idEstudante, dados);
      localStorage.setItem("mensagemSucesso", "Tema cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
    } finally {
      setIsLoading(false);
    }
  };

//   const handleAtualizarTema = async (idTema: string, dados: TemaPayload) => {
//     try {
//       setIsLoading(true);
//       await atualizarTema(idTema, dados);
//       setSucesso("Tema atualizado com sucesso.");
//     } catch (error: any) {
//       setErro(error.message || "Erro ao atualizar tema.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const handleRemoverTemaEstudante = async (idEstudante: string) => {
    try {
      setIsLoading(true);
      await removerTemaEstudante(idEstudante);
      setSucesso("Tema removido com sucesso.");
    } catch (error: any) {
      setErro(error.message || "Erro ao remover tema.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleListarTemasEstudante = async (idEstudante: string) => {
    try {
      return await listarTemasEstudante(idEstudante);
    } catch (error: any) {
      setErro(error.message || "Erro ao listar temas.");
      return [];
    }
  };

  return {
    erro,
    sucesso,
    isLoading,
    handleCadastrarTema,
    // handleAtualizarTema,
    handleRemoverTemaEstudante,
    handleListarTemasEstudante,
  };
};
