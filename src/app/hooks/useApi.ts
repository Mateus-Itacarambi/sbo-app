import { useState } from 'react';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const fazerRequisicao = async (url: string, metodo: string, dados: any, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro na requisição");
      }

      setSucesso("Operação realizada com sucesso!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    erro,
    sucesso,
    fazerRequisicao,
    setErro,
    setSucesso
  };
};