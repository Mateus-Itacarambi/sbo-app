import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { atualizarPerfil } from "@/services/perfilService";

export const usePerfilActions = () => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAtualizarPerfil = async (e: React.FormEvent, formData: any, role: string) => {
    try {
      setIsLoading(true);
      await atualizarPerfil(e, formData, role);
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
