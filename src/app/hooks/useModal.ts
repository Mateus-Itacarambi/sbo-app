import { Estudante, Formacao } from '@/types';
import { useState } from 'react';
import { useTema } from './useTema';
import { useFormacao } from './useFormacao';

export const useModal = (usuario: any) => {
  const [modalTema, setModalTema] = useState(false);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
  const [modalAdicionarEstudanteTema, setModalAdicionarEstudanteTema] = useState(false);
  const [modalRemoverEstudanteTema, setModalRemoverEstudanteTema] = useState(false);
  const [modalConfirmarRemocaoTema, setModalConfirmarRemocaoTema] = useState(false);

  const [modalFormacao, setModalFormacao] = useState(false);
  const [modalFormacoes, setModalFormacoes] = useState(false);
  const [modalAdicionarFormacao, setModalAdicionarFormacao] = useState(false);
  const [modalConfirmarRemocaoFormacao, setModalConfirmarRemocaoFormacao] = useState(false);

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
    setModalTema(true);
  };
  
  const handleAbrirModalFormacao = (formacaoSelecionada?: Formacao) => {
    if (formacaoSelecionada) {
      formacao.setCurso(formacaoSelecionada.curso || "");
      formacao.setInstituicao(formacaoSelecionada.instituicao || "");
      formacao.setTitulo(formacaoSelecionada.titulo || "");
      formacao.setAnoInicio(String(formacaoSelecionada.anoInicio || ""));
      formacao.setAnoFim(String(formacaoSelecionada.anoFim || ""));
    } else {
      formacao.setCurso("");
      formacao.setInstituicao("");
      formacao.setTitulo("");
      formacao.setAnoInicio("");
      formacao.setAnoFim("");
    }
    setModalFormacoes(true);
  };
  
  return {
    modalTema,
    setModalTema,
    modalEditarPerfil,
    setModalEditarPerfil,
    modalAdicionarEstudanteTema,
    setModalAdicionarEstudanteTema,
    modalRemoverEstudanteTema,
    setModalRemoverEstudanteTema,
    modalConfirmarRemocaoTema,
    setModalConfirmarRemocaoTema,
    handleAbrirModalTema,
    modalFormacao, 
    setModalFormacao,
    modalFormacoes, 
    setModalFormacoes,
    modalAdicionarFormacao, 
    setModalAdicionarFormacao,
    handleAbrirModalFormacao,
    modalConfirmarRemocaoFormacao,
    setModalConfirmarRemocaoFormacao,
  };
};