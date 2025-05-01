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

export default function Perfil() {
  const { usuario } = useAuth();

  const {
    setTemaTitulo,
    setTemaDescricao,
    setTemaPalavrasChave
  } = useTema();

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
    setModalConfirmarRemocaoTemaAberto
  } = useModal();

  const { formData, setFormData, handleChange, handleGeneroChange, handleSemestreChange } = useFormulario({});

  const { setSemestresDisponiveis, cursos, semestresDisponiveis, handleCursoChange } = useCursos(usuario, formData);

  const { orientador } = useOrientador(usuario);

  const {
    erro,
    setErro,
    sucesso,
    setSucesso,
    mostrarAlerta,
    isLoading,
    setIsLoading
  } = useAlertaTemporario();

  const [matricula, setMatricula] = useState("");
  const {
    handleCadastrarTema,
    // handleAtualizarTema,
    handleRemoverTemaEstudante,
    handleListarTemasEstudante,
  } = useTemaActions();

  useEffect(() => {
    if (usuario) {
      setFormData({
        ...usuario,
        curso: usuario.role === "ESTUDANTE" ? (usuario as Estudante).curso?.id || "" : "",
      });
    }
  }, [usuario]);

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

  const cadastrarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    if (!usuario) return;
    await handleCadastrarTema(e, usuario.id, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const adicionarEstudanteTema = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!usuario) return;
  
    try {
      const response = await fetch(`http://localhost:8080/temas/${(usuario as Estudante).tema?.id}/adicionarEstudante/${usuario.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          matricula: matricula
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao adicionar estudante ao tema");
      }

      localStorage.setItem("mensagemSucesso", "Estudante adicionado com sucesso!");
      location.reload();
    } catch (error: any) {
      console.error("Erro ao adicionar estudante ao tema:", error);

      if (error.message.includes("Failed to fetch")) {
        setErro("Erro ao conectar ao servidor.");
      } else {
        setErro(error.message || "Erro desconhecido.");
      }

      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };
  
  const removerEstudanteTema = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!usuario) return;
  
    try {
      const response = await fetch(`http://localhost:8080/temas/${(usuario as Estudante).tema?.id}/removerEstudante/${usuario.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          matricula: matricula
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao remover estudante do tema");
      }

      localStorage.setItem("mensagemSucesso", "Estudante removido com sucesso!");
      location.reload();
    } catch (error: any) {
      console.error("Erro ao remover estudante do tema:", error);

      if (error.message.includes("Failed to fetch")) {
        setErro("Erro ao conectar ao servidor.");
      } else {
        setErro(error.message || "Erro desconhecido.");
      }

      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };
  
  const atualizarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    e.preventDefault();
    setIsLoading(true);
    if (!usuario || !(usuario as Estudante).tema) return;
  
    try {
      const response = await fetch(`http://localhost:8080/temas/${(usuario as Estudante).tema?.id}/atualizar/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          palavrasChave: palavrasChave,
        }),
      });
  
      if (!response.ok) throw new Error(await response.text());

      localStorage.setItem("mensagemSucesso", "Tema atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverTema = async () => {
    if (!usuario) return;
  
    try {
      const response = await fetch(`http://localhost:8080/temas/${(usuario as Estudante).tema?.id}/deletar/${usuario.id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao remover tema");
      }

      localStorage.setItem("mensagemSucesso", "Tema removido com sucesso!");
      location.reload();
    } catch (error: any) {
      console.error("Erro ao remover tema:", error);
  
      if (error.message.includes("Failed to fetch")) {
        setErro("Erro ao conectar ao servidor.");
      } else {
        setErro(error.message || "Erro desconhecido.");
      }
  
      setSucesso("");
    }
  };
  
  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint =
      usuario?.role === "ESTUDANTE" ? "/estudantes" : "/professores";
  
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao atualizar perfil");
      }

      localStorage.setItem("mensagemSucesso", "Atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);

      setErro(error.message || "Erro desconhecido.");

      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

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
          matricula={matricula}
          setMatricula={setMatricula}
          isLoading={isLoading}
          textoBotao={modalAdicionarEstudanteTemaAberto ? "Adicionar" : "Remover"}
        />
      )}

      {modalConfirmarRemocaoTemaAberto && (
        <ModalConfirmarTema 
          onClose={() => setModalConfirmarRemocaoTemaAberto(false)}
          handleRemoverTema={handleRemoverTema}
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
          onSalvarPerfil={handleSalvarPerfil}
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