import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { atualizarPerfil } from "@/services/perfilService";

export const usePerfilActions = (usuario: any, formData: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAtualizarPerfil = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      await atualizarPerfil(e, usuario, formData);
      localStorage.setItem("mensagemSucesso", "Perfil atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAtualizarPerfil,
  };
};
