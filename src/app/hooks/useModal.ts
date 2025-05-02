import { Estudante } from '@/types';
import { useState } from 'react';
import { useTema } from './useTema';

export const useModal = (usuario: any) => {
  const [modalTemaAberto, setModalTemaAberto] = useState(false);
  const [modalEditarPerfilAberto, setModalEditarPerfilAberto] = useState(false);
  const [modalAdicionarEstudanteTemaAberto, setModalAdicionarEstudanteTemaAberto] = useState(false);
  const [modalRemoverEstudanteTemaAberto, setModalRemoverEstudanteTemaAberto] = useState(false);
  const [modalConfirmarRemocaoTemaAberto, setModalConfirmarRemocaoTemaAberto] = useState(false);

  const {
    setTemaTitulo,
    setTemaDescricao,
    setTemaPalavrasChave
  } = useTema();

  const handleAbrirModalTema = () => {
    const tema = (usuario as Estudante)?.tema;
    if (tema) {
      setTemaTitulo(tema.titulo || "");
      setTemaDescricao(tema.descricao || "");
      setTemaPalavrasChave(tema.palavrasChave || "");
    } else {
      setTemaTitulo("");
      setTemaDescricao("");
      setTemaPalavrasChave("");
    }
    setModalTemaAberto(true);
  };
  
  return {
    modalTemaAberto,
    setModalTemaAberto,
    modalEditarPerfilAberto,
    setModalEditarPerfilAberto,
    modalAdicionarEstudanteTemaAberto,
    setModalAdicionarEstudanteTemaAberto,
    modalRemoverEstudanteTemaAberto,
    setModalRemoverEstudanteTemaAberto,
    modalConfirmarRemocaoTemaAberto,
    setModalConfirmarRemocaoTemaAberto,
    handleAbrirModalTema
  };
};