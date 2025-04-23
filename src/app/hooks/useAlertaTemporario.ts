import { useEffect } from 'react';

interface AlertaParams {
  erro: string;
  sucesso: string;
  setErro: (msg: string) => void;
  setSucesso: (msg: string) => void;
  setMostrarAlerta: (mostrar: boolean) => void;
}

export function useAlertaTemporario({
  erro,
  sucesso,
  setErro,
  setSucesso,
  setMostrarAlerta,
}: AlertaParams) {
  useEffect(() => {
    const sucessoStorage = localStorage.getItem("mensagemSucesso");
    const erroStorage = localStorage.getItem("mensagemErro");

    if (sucessoStorage) {
      setSucesso(sucessoStorage);
      localStorage.removeItem("mensagemSucesso");
    }

    if (erroStorage) {
      setErro(erroStorage);
      localStorage.removeItem("mensagemErro");
    }
  }, [setErro, setSucesso]);

  useEffect(() => {
    if (erro || sucesso) {
      setMostrarAlerta(true);
      const timer = setTimeout(() => {
        setMostrarAlerta(false);
        setErro('');
        setSucesso('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro, sucesso, setErro, setSucesso, setMostrarAlerta]);
}
