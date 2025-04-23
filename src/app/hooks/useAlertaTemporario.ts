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
