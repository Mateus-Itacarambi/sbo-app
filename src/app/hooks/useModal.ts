import { Estudante, Formacao } from '@/types';
import { useState } from 'react';
import { useTema } from './useTema';
import { useFormacao } from './useFormacao';

export const useModal = (usuario: any) => {
  const [modalTemaAberto, setModalTemaAberto] = useState(false);
  const [modalEditarPerfilAberto, setModalEditarPerfilAberto] = useState(false);
  const [modalAdicionarEstudanteTemaAberto, setModalAdicionarEstudanteTemaAberto] = useState(false);
  const [modalRemoverEstudanteTemaAberto, setModalRemoverEstudanteTemaAberto] = useState(false);
  const [modalConfirmarRemocaoTemaAberto, setModalConfirmarRemocaoTemaAberto] = useState(false);

  const [modalFormacaoAberto, setModalFormacaoAberto] = useState(false);
  const [modalAdicionarFormacaoAberto, setModalAdicionarFormacaoAberto] = useState(false);

  const {
    setTemaTitulo,
    setTemaDescricao,
    setTemaPalavrasChave
  } = useTema();

  const formacao = useFormacao();

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
  
  const handleAbrirModalFormacao = (formacaoSelecionada?: Formacao) => {
    if (formacaoSelecionada) {
      formacao.setCurso(formacaoSelecionada.curso || "");
      formacao.setFaculdade(formacaoSelecionada.faculdade || "");
      formacao.setTitulo(formacaoSelecionada.titulo || "");
      formacao.setAnoInicio(String(formacaoSelecionada.anoInicio || ""));
      formacao.setAnoFim(String(formacaoSelecionada.anoFim || ""));
    } else {
      formacao.setCurso("");
      formacao.setFaculdade("");
      formacao.setTitulo("");
      formacao.setAnoInicio("");
      formacao.setAnoFim("");
    }
    setModalFormacaoAberto(true);
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
    handleAbrirModalTema,
    modalFormacaoAberto, 
    setModalFormacaoAberto,
    modalAdicionarFormacaoAberto, 
    setModalAdicionarFormacaoAberto,
    handleAbrirModalFormacao
  };
};