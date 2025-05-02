"use client";

import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";
import Loading from "@/components/Loading/loading";
import Alerta from "@/components/Alerta";
import { Estudante, Professor } from "@/types";
import ModalEditarPerfil from "@/components/Modal/ModalEditarPerfil";
import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporario, useTema, useModal, useFormulario, useCursos, useOrientador } from '@/hooks';
import PerfilCabecalho from "@/components/Perfil/PerfilCabecalho";
import CardInfo from "@/components/Perfil/CardInfo";
import CardTema from "@/components/Perfil/CardTema";
import CardOrientador from "@/components/Perfil/CardOrientador";
import ModalTema from "@/components/Modal/ModalTema";
import ModalEstudanteTema from "@/components/Modal/ModalEstudanteTema";
import ModalConfirmarTema from "@/components/Modal/ModalConfirmar";
import { useTemaActions } from "@/hooks/useTemaActions";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { usePerfilActions } from "@/hooks/usePerfilActions";

export default function Perfil() {
  const { usuario } = useAuth();

  const { erro, sucesso, isLoading, mostrarAlerta, setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const {
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
  } = useModal(usuario);

  const { formData, setFormData, handleChange, handleGeneroChange, handleSemestreChange } = useFormulario({});

  const { setSemestresDisponiveis, cursos, semestresDisponiveis, handleCursoChange } = useCursos(usuario, formData);

  const { orientador } = useOrientador(usuario);

  const { handleAtualizarPerfil } = usePerfilActions();

  const {
    handleCadastrarTema,
    handleAtualizarTema,
    handleRemoverTema,
    handleAdicionarEstudanteTema,
    handleRemoverEstudanteTema
  } = useTemaActions();

  useEffect(() => {
    if (usuario) {
      setFormData({
        ...usuario,
        curso: usuario.role === "ESTUDANTE" ? (usuario as Estudante).curso?.id || "" : "",
      });
    }
  }, [usuario]);

  const cadastrarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    if (!usuario) return;
    await handleCadastrarTema(e, usuario.id, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const atualizarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    if (!usuario || !(usuario as Estudante).tema) return;
    await handleAtualizarTema(e, (usuario as Estudante).tema?.id, usuario.id, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const removerTema = async () => {
    if (!usuario || !(usuario as Estudante).tema) return;
    await handleRemoverTema((usuario as Estudante).tema?.id, usuario.id);
  };

  const adicionarEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    if (!usuario || !(usuario as Estudante).tema) return;
    await handleAdicionarEstudanteTema(e, (usuario as Estudante).tema?.id, usuario.id, matricula);
  };

  const removerEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    if (!usuario || !(usuario as Estudante).tema) return;
    await handleRemoverEstudanteTema(e, (usuario as Estudante).tema?.id, usuario.id, matricula);
  };

  const atualizarPerfil = async (e: React.FormEvent, formData: any) => {
    if (!usuario || !(usuario as Estudante).tema) return;
    await handleAtualizarPerfil(e, formData, usuario.role);
  };

  
  // const handleSalvarPerfil = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const endpoint =
  //     usuario?.role === "ESTUDANTE" ? "/estudantes" : "/professores";
  
  //   try {
  //     const response = await fetch(`http://localhost:8080${endpoint}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       throw new Error(errorData || "Erro ao atualizar perfil");
  //     }

  //     localStorage.setItem("mensagemSucesso", "Atualizado com sucesso!");
  //     location.reload();
  //   } catch (error: any) {
  //     console.error("Erro ao atualizar perfil:", error);

  //     setErro(error.message || "Erro desconhecido.");

  //     setSucesso("");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleCancelar = () => {
    if (usuario) {
      setFormData({
        ...usuario,
        curso: usuario.role === "ESTUDANTE" ? (usuario as Estudante).curso?.id || "" : "",
      });

      const cursoOriginal = cursos.find(c => c.value === (usuario as Estudante).curso?.id);
      if (cursoOriginal) {
        const semestres = Array.from({ length: cursoOriginal.semestres }, (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        }));
        setSemestresDisponiveis(semestres);
      } else {
        setSemestresDisponiveis([]);
      }
    }
  
    setModalEditarPerfilAberto(false);
  };

  if (!usuario) return <Loading />;

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
            <PerfilCabecalho usuario={usuario} onEditar={() => setModalEditarPerfilAberto(true)} />
            
            <CardInfo titulo="Data de Nascimento" texto={new Date(usuario.dataNascimento).toLocaleDateString("pt-BR")} />
            <CardInfo titulo="Gênero" texto={usuario.genero} />

          {usuario.role === "ESTUDANTE" && (
            <>
              <CardInfo titulo="Matrícula" texto={(usuario as Estudante).matricula} />

              <CardTema 
                usuario={usuario as Estudante} 
                onEditar={handleAbrirModalTema}
                onRemover={() => setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarEstudante={() => setModalAdicionarEstudanteTemaAberto(true)}
                onRemoverEstudante={() => setModalRemoverEstudanteTemaAberto(true)}
                onCancelarOrientação={() => setModalConfirmarRemocaoTemaAberto(true)}
                onAdicionarTema={() => setModalTemaAberto(true)}
              />

              <CardOrientador
                usuario={usuario as Estudante}
                orientador={orientador}
              />
            </>
          )}
        </div>
      </div>
      {modalTemaAberto && (
        <ModalTema
          usuario={usuario}
          onClose={() => setModalTemaAberto(false)}
          atualizarTema={atualizarTema}
          cadastrarTema={cadastrarTema}
          onCancelar={() => setModalTemaAberto(false)}
          isLoading={isLoading}
        />
      )}

      {(modalAdicionarEstudanteTemaAberto || modalRemoverEstudanteTemaAberto) && (
        <ModalEstudanteTema
          titulo={modalAdicionarEstudanteTemaAberto ? "Adicionar Estudante ao Tema" : "Remover Estudante do Tema"}
          onClose={() => {
            setModalAdicionarEstudanteTemaAberto(false);
            setModalRemoverEstudanteTemaAberto(false);
          }}
          onSubmit={modalAdicionarEstudanteTemaAberto ? adicionarEstudanteTema : removerEstudanteTema}
          isLoading={isLoading}
          textoBotao={modalAdicionarEstudanteTemaAberto ? "Adicionar" : "Remover"}
        />
      )}

      {modalConfirmarRemocaoTemaAberto && (
        <ModalConfirmarTema 
          onClose={() => setModalConfirmarRemocaoTemaAberto(false)}
          handleRemoverTema={removerTema}
          isLoading={isLoading}
        />
      )}

      {modalEditarPerfilAberto && (
        <ModalEditarPerfil 
          usuario={usuario}
          formData={formData}
          cursos={cursos}
          semestresDisponiveis={semestresDisponiveis}
          onClose={() => setModalEditarPerfilAberto(false)}
          onSalvarPerfil={atualizarPerfil}
          handleChange={handleChange}
          handleGeneroChange={handleGeneroChange}
          handleCursoChange={handleCursoChange}
          handleSemestreChange={handleSemestreChange}
          handleCancelar={handleCancelar}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}