import { useState } from 'react';

export const useModal = () => {
  const [modalTemaAberto, setModalTemaAberto] = useState(false);
  const [modalEditarPerfilAberto, setModalEditarPerfilAberto] = useState(false);
  const [modalAdicionarEstudanteTemaAberto, setModalAdicionarEstudanteTemaAberto] = useState(false);
  const [modalRemoverEstudanteTemaAberto, setModalRemoverEstudanteTemaAberto] = useState(false);
  const [modalConfirmarRemocaoTemaAberto, setModalConfirmarRemocaoTemaAberto] = useState(false);
  
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
    setModalConfirmarRemocaoTemaAberto
  };
};