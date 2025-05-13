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
import CardTema from "@/components/Perfil/Estudante/CardTema";
import CardOrientador from "@/components/Perfil/Estudante/CardOrientador";

import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { useModal, useFormulario, useCursos, useOrientador, useTemaActions, usePerfilActions } from "@/hooks";
import { Estudante } from "@/types";

export default function Perfil() {
  const { usuario } = useAuth();
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

  const renderModalTema = () => (
    <ModalTema
      usuario={usuario}
      onClose={() => modal.setModalTemaAberto(false)}
      atualizarTema={(e, t, p, d) => temaActions.handleAtualizarTema(e, { titulo: t, palavrasChave: p, descricao: d })}
      cadastrarTema={(e, t, p, d) => temaActions.handleCadastrarTema(e, { titulo: t, palavrasChave: p, descricao: d })}
      onCancelar={() => modal.setModalTemaAberto(false)}
      isLoading={isLoading}
    />
  );

  const renderModalEstudanteTema = () => (
    <ModalEstudanteTema
      titulo={modal.modalAdicionarEstudanteTemaAberto ? "Adicionar Estudante ao Tema" : "Remover Estudante do Tema"}
      onClose={() => {
        modal.setModalAdicionarEstudanteTemaAberto(false);
        modal.setModalRemoverEstudanteTemaAberto(false);
      }}
      onSubmit={(e, matricula) =>
        modal.modalAdicionarEstudanteTemaAberto
          ? temaActions.handleAdicionarEstudanteTema(e, matricula)
          : temaActions.handleRemoverEstudanteTema(e, matricula)
      }
      isLoading={isLoading}
      textoBotao={modal.modalAdicionarEstudanteTemaAberto ? "Adicionar" : "Remover"}
    />
  );

  const renderModalEditarPerfil = () => (
    <ModalEditarPerfil
      usuario={usuario}
      formData={form.formData}
      cursos={cursosHook.cursos}
      semestresDisponiveis={cursosHook.semestresDisponiveis}
      onClose={() => modal.setModalEditarPerfilAberto(false)}
      onSalvarPerfil={(e) => perfilActions.handleAtualizarPerfil(e)}
      handleChange={form.handleChange}
      handleGeneroChange={form.handleGeneroChange}
      handleCursoChange={cursosHook.handleCursoChange}
      handleSemestreChange={form.handleSemestreChange}
      handleCancelar={handleCancelar}
      isLoading={isLoading}
    />
  );

  const renderModalConfirmarRemocao = () => (
    <ModalConfirmarTema
      onClose={() => modal.setModalConfirmarRemocaoTemaAberto(false)}
      handleRemoverTema={() => temaActions.handleRemoverTema()}
      isLoading={isLoading}
    />
  );

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
            <>
              <CardInfo titulo="Matrícula" texto={estudante.matricula} />
              <CardTema
                usuario={estudante}
                onEditar={modal.handleAbrirModalTema}
                onRemover={() => modal.setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarEstudante={() => modal.setModalAdicionarEstudanteTemaAberto(true)}
                onRemoverEstudante={() => modal.setModalRemoverEstudanteTemaAberto(true)}
                onCancelarOrientação={() => modal.setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarTema={() => modal.setModalTemaAberto(true)}
              />
              <CardOrientador usuario={estudante} orientador={orientador} />
            </>
          )}
        </div>
      </div>

      {modal.modalTemaAberto && renderModalTema()}
      {(modal.modalAdicionarEstudanteTemaAberto || modal.modalRemoverEstudanteTemaAberto) && renderModalEstudanteTema()}
      {modal.modalConfirmarRemocaoTemaAberto && renderModalConfirmarRemocao()}
      {modal.modalEditarPerfilAberto && renderModalEditarPerfil()}
    </div>
  );
}