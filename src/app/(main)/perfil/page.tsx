"use client";

import { useEffect } from "react";
import styles from "./perfil.module.scss";

import Loading from "@/components/Loading/loading";
import Alerta from "@/components/Alerta";
import ModalEditarPerfil from "@/components/Modal/ModalEditarPerfil";
import ModalTema from "@/components/Modal/ModalTema";
import ModalEstudanteTema from "@/components/Modal/ModalEstudanteTema";
import ModalConfirmarTema from "@/components/Modal/ModalConfirmar";

import PerfilCabecalho from "@/components/Perfil/PerfilCabecalho";
import CardInfo from "@/components/Perfil/CardInfo";
import PerfilEstudante from "@/components/Perfil/PerilEstudante";

import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { useModal, useFormulario, useCursos, useOrientador, useTemaActions, usePerfilActions } from "@/hooks";
import { Estudante, Professor } from "@/types";

export default function Perfil() {
  const { usuario } = useAuth();
  const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
  const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;

  const { erro, sucesso, isLoading, mostrarAlerta } = useAlertaTemporarioContext();

  const modal = useModal(usuario);
  const form = useFormulario({});
  const cursosHook = useCursos(usuario, form.formData);
  const { orientador } = useOrientador(usuario);
  const perfilActions = usePerfilActions(usuario, form.formData);
  const temaActions = useTemaActions(usuario);

  useEffect(() => {
    resetFormData();
  }, [usuario]);

  const resetFormData = () => {
    if (usuario) {
      form.setFormData({
        ...usuario,
        curso: estudante?.curso?.id || "",
      });

      const cursoOriginal = cursosHook.cursos.find(c => c.value === estudante?.curso?.id);
      if (cursoOriginal) {
        const semestres = Array.from({ length: cursoOriginal.semestres }, (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        }));
        cursosHook.setSemestresDisponiveis(semestres);
      } else {
        cursosHook.setSemestresDisponiveis([]);
      }
    }
  };

  const handleCancelar = () => {
    resetFormData();
    modal.setModalEditarPerfilAberto(false);
  };

  const cadastrarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    await temaActions.handleCadastrarTema(e, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const atualizarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    await temaActions.handleAtualizarTema(e, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const removerTema = async () => {
    await temaActions.handleRemoverTema();
  };

  const adicionarEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    await temaActions.handleAdicionarEstudanteTema(e, matricula);
  };

  const removerEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    await temaActions.handleRemoverEstudanteTema(e, matricula);
  };

  const atualizarPerfil = async (e: React.FormEvent) => {
    await perfilActions.handleAtualizarPerfil(e);
  };

  if (!usuario) return <Loading />;

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
            <PerfilCabecalho usuario={usuario} onEditar={() => modal.setModalEditarPerfilAberto(true)} />
            
            <CardInfo titulo="Data de Nascimento" texto={new Date(usuario.dataNascimento).toLocaleDateString("pt-BR")} />
            <CardInfo titulo="Gênero" texto={usuario.genero} />

            {estudante && (
              <PerfilEstudante
                estudante={estudante}
                orientador={orientador}
                onEditarTema={modal.handleAbrirModalTema}
                onRemoverTema={() => modal.setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarEstudante={() => modal.setModalAdicionarEstudanteTemaAberto(true)}
                onRemoverEstudante={() => modal.setModalRemoverEstudanteTemaAberto(true)}
                onCancelarOrientacao={() => modal.setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarTema={() => modal.setModalTemaAberto(true)}
              />
            )}

        </div>
      </div>
      {modal.modalTemaAberto && (
        <ModalTema
          usuario={usuario}
          onClose={() => modal.setModalTemaAberto(false)}
          atualizarTema={atualizarTema}
          cadastrarTema={cadastrarTema}
          onCancelar={() => modal.setModalTemaAberto(false)}
          isLoading={isLoading}
        />
      )}

      {(modal.modalAdicionarEstudanteTemaAberto || modal.modalRemoverEstudanteTemaAberto) && (
        <ModalEstudanteTema
          titulo={modal.modalAdicionarEstudanteTemaAberto ? "Adicionar Estudante ao Tema" : "Remover Estudante do Tema"}
          onClose={() => {
            modal.setModalAdicionarEstudanteTemaAberto(false);
            modal.setModalRemoverEstudanteTemaAberto(false);
          }}
          onSubmit={modal.modalAdicionarEstudanteTemaAberto ? adicionarEstudanteTema : removerEstudanteTema}
          isLoading={isLoading}
          textoBotao={modal.modalAdicionarEstudanteTemaAberto ? "Adicionar" : "Remover"}
        />
      )}

      {modal.modalConfirmarRemocaoTemaAberto && (
        <ModalConfirmarTema 
          onClose={() => modal.setModalConfirmarRemocaoTemaAberto(false)}
          handleRemoverTema={removerTema}
          isLoading={isLoading}
        />
      )}

      {modal.modalEditarPerfilAberto && (
        <ModalEditarPerfil 
          usuario={usuario}
          formData={form.formData}
          cursos={cursosHook.cursos}
          semestresDisponiveis={cursosHook.semestresDisponiveis}
          onClose={() => modal.setModalEditarPerfilAberto(false)}
          onSalvarPerfil={atualizarPerfil}
          handleChange={form.handleChange}
          handleGeneroChange={form.handleGeneroChange}
          handleCursoChange={cursosHook.handleCursoChange}
          handleSemestreChange={form.handleSemestreChange}
          handleCancelar={handleCancelar}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}