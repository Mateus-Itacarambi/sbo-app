"use client";

import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";
import Image from "next/image";
import Loading from "@/components/Loading/loading";
import InputAuth from "@/components/InputAuth";
import { useRouter } from "next/navigation";
import Alerta from "@/components/Alerta";
import SelectAuth from "@/components/SelectAuth";
import { Curso, Estudante, generos, Professor, Usuario } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import Icone from "@/assets/tres-pontos.png"

interface CursoSelect {
  value: number;
  label: string;
  semestres: number;
}

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Estudante | Professor | null>(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursos, setCursos] = useState<CursoSelect[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number, label: string }[]>([]);
  const [mostrarModalTema, setMostrarModalTema] = useState(false);
  const [temaTitulo, setTemaTitulo] = useState("");
  const [temaDescricao, setTemaDescricao] = useState("");
  const [temaPalavrasChave, setTemaPalavrasChave] = useState("");

  const handleCadastrarTema = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!usuario) return;
  
    try {
      const response = await fetch(`http://localhost:8080/temas/estudante/${usuario.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          titulo: temaTitulo,
          descricao: temaDescricao,
          palavrasChave: temaPalavrasChave
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao cadastrar tema");
      }
  
      setSucesso("Tema cadastrado com sucesso!");
      setErro("");
      setMostrarModalTema(false);
      const data = await response.json();
      
      if (data.tema) {
        setUsuario(prev => prev ? { ...prev, tema: data.tema } : prev);
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar tema:", error);

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
  
      setUsuario(prev => prev ? { ...prev, tema: undefined } : null);
      setSucesso("Tema removido com sucesso!");
      setErro("");
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

  useEffect(() => {
    if (erro || sucesso) {
      setmostrarMensagem(true);
      const timer = setTimeout(() => {
        setmostrarMensagem(false);
        setErro("");
        setSucesso("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro, sucesso]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          setFormData({
            ...data,
            curso: data.curso?.id || "",
          });
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUsuario();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch("http://localhost:8080/cursos");
        if (!res.ok) throw new Error("Erro ao buscar cursos");

        const data = await res.json();
        const cursosMapeados = data.content.map((curso: Curso) => ({
          value: curso.id,
          label: curso.nome,
          semestres: curso.semestres,
        }));
        setCursos(cursosMapeados);

        const cursoId = formData.curso;
        const cursoUsuario = cursosMapeados.find((c: { value: number }) => c.value === Number(cursoId));        if (cursoUsuario) {
          const semestres = Array.from({ length: cursoUsuario.semestres }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}º Semestre`,
          }));
          setSemestresDisponiveis(semestres);
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };

    if (usuario && usuario.role === "ESTUDANTE") fetchCursos();
  }, [usuario, formData.curso]);

  const handleCursoChange = (cursoId: string) => {
    const id = Number(cursoId);
    setFormData({ ...formData, curso: id, semestre: 0 });

    const cursoSelecionado = cursos.find(curso => curso.value === id);
    if (cursoSelecionado) {
      const semestres = Array.from({ length: cursoSelecionado.semestres }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}º Semestre`,
      }));
      setSemestresDisponiveis(semestres);
    } else {
      setSemestresDisponiveis([]);
    }
  };

  const handleGeneroChange = (genero: string) => {
    setFormData({ ...formData, genero: genero });
  };

  const handleSemestreChange = (semestre: string) => {
    setFormData({ ...formData, semestre: Number(semestre) });
  };

  const getInitials = (nome: string) => {
    const nomes = nome.split(" ");
    return nomes.length > 1
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditar = () => {
    setEditando(true);
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
  
    setEditando(false);
  };
  

  const handleSalvar = async () => {
    try {
      const endpoint = usuario?.role === "ESTUDANTE" ? "estudantes" : "professores";
      const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      console.log(formData)

      if (!response.ok) throw new Error(await response.text());

      const atualizado = await response.json();
      setUsuario(atualizado);
      setEditando(false);
      setSucesso("Perfil atualizado com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido.");
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  if (!usuario) return <Loading />;

  return (
    <div className={styles.main}>
      {sucesso && mostrarMensagem && <Alerta text={sucesso} theme="sucesso" top="10rem" />}
      {erro && mostrarMensagem && <Alerta text={erro} theme="erro" top="10rem" />}
      <div className={styles.container}>
        <div className={styles.card_container}>
          <div className={styles.card_perfil}>
            <div className={styles.profile}>
              {usuario.profileImage ? (
                <Image src={usuario.profileImage} alt="Foto de perfil" width={100} height={100} className={styles.profileImage} />
              ) : (
                <div className={styles.initials}>{getInitials(usuario.nome)}</div>
              )}
            </div>
            <div className={styles.detalhes}>
              <h1>{usuario.nome}</h1>
              <p>{usuario.email}</p>
              {usuario.role === "ESTUDANTE" && <p>{(usuario as Estudante).curso?.nome} - {(usuario as Estudante).semestre}º semestre</p>}
              {usuario.role === "PROFESSOR" && <p>{(usuario as Professor).disponibilidade}</p>}
            </div>
            <div className={styles.editar}>
              {!editando ? (
                <button className={styles.editBtn} onClick={handleEditar}>Editar</button>
              ) : (
                <>
                  <ButtonAuth text="Salvar" type="submit" theme="primary" onClick={handleSalvar} disabled={isLoading} />
                  <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={handleCancelar} disabled={isLoading} />
                </>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Data de Nascimento -</h2>
            <p>{new Date(usuario.dataNascimento).toLocaleDateString("pt-BR")}</p>
          </div>
          <div className={styles.card}>
            <h2>Gênero -</h2>
            <p>{usuario.genero}</p>
          </div>

          {usuario.role === "ESTUDANTE" && (
            <>
              <div className={styles.card}>
                <h2>Matrícula -</h2>
                <p>{(usuario as Estudante).matricula}</p>
              </div>

              <div className={styles.card_tema}>
                  <h2>Tema</h2>
                {(usuario as Estudante).tema ? (
                  <div className={styles.tema}>
                    <div className={styles.tema_content}>
                      <div className={styles.title}>
                        {(usuario as Estudante).tema?.titulo}
                        <Dropdown
                          label=""
                          top="3rem"
                          icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
                          items={[
                            { type: "link", label: "", href: "" },
                            { type: "action", label: "Editar", onClick: () => setMostrarModalTema(true)},
                            { type: "action", label: "Remover", onClick: handleRemoverTema },
                          ]}
                        />
                      </div>
                      <div className={styles.status}>{(usuario as Estudante).tema?.statusTema}</div>
                      <div className={styles.keywords}>{(usuario as Estudante).tema?.palavrasChave}</div>
                      <div className={styles.description}>
                        {(usuario as Estudante).tema?.estudantes
                          ?.map(e => e.nome)
                          .sort((a, b) => a.localeCompare(b))
                          .join(', ') || 'Nenhum estudante'}
                      </div>
                      <div className={styles.description}>{(usuario as Estudante).tema?.descricao}</div>
                    </div>
                  </div>

                ) : (
                  <>
                    <p>Não possui um tema cadastrado.</p>
                    <ButtonAuth text="Adicionar Tema" type="button" theme="primary" onClick={() => setMostrarModalTema(true)} />
                  </>
                )}
              </div>
            </>
          )}


          <div className={styles.card}>
            <h2>Detalhes do usuário</h2>
            <p>
              <strong>Nome Completo</strong>
              {usuario.nome}
            </p>
            <form className={styles.form}>
              <InputAuth label="Nome Completo" name="nome" type="text" value={formData.nome} onChange={handleChange} disabled={!editando} />
              <InputAuth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={!editando} />
              <InputAuth label="Data de Nascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} disabled={!editando} />
              <SelectAuth text="Gênero" options={generos} onChange={handleGeneroChange} disabled={!editando} selected={formData.genero} />

              {usuario.role === "ESTUDANTE" && (
                <>
                  <InputAuth label="Matrícula" name="matricula" type="text" value={formData.matricula} onChange={handleChange} disabled={!editando} />
                  <SelectAuth text="Curso" options={cursos} onChange={handleCursoChange} disabled={!editando} selected={formData.curso} />
                  <SelectAuth text="Semestre" options={semestresDisponiveis} onChange={handleSemestreChange} disabled={!editando || semestresDisponiveis.length === 0} selected={formData.semestre} />
                </>
              )}

              {usuario.role === "PROFESSOR" && (
                <>
                  <InputAuth label="ID Lattes" type="text" value={formData.idLattes || ""} onChange={handleChange} disabled={!editando} />
                  <InputAuth label="Disponibilidade" type="text" value={formData.disponibilidade || ""} onChange={handleChange} disabled={!editando} />
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      {mostrarModalTema && (
        <Modal onClose={() => setMostrarModalTema(false)}>
          <form name="cadastro_estudante" onSubmit={handleCadastrarTema}>
            <InputAuth
              label="Título"
              type="text"
              placeholder="Título do tema"
              value={temaTitulo}
              onChange={(e) => setTemaTitulo(e.target.value)}
            />
            <InputAuth
              label="Palavras-chave"
              type="text"
              placeholder="Palavras-chave do tema"
              value={temaPalavrasChave}
              onChange={(e) => setTemaPalavrasChave(e.target.value)}
            />
            <InputAuth
              label="Descrição"
              type="textarea"
              placeholder="Descrição do tema"
              value={temaDescricao}
              onChange={(e) => setTemaDescricao(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={() => setMostrarModalTema(false)} />
              <ButtonAuth text="Salvar" type="submit" theme="primary"/>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
