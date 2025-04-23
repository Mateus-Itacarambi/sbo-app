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
import Icone from "@/assets/tres-pontos.png";
import ModalEditarPerfil from "@/components/ModalEditarPerfil";
import StatusBadge from "@/components/StatusBadge";
import { getInitials } from "@/utils/getInitials";
import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporario } from '@/hooks/useAlertaTemporario';

type UsuarioCompleto = Estudante | Professor;

type StatusTipo = 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO';

interface CursoSelect {
  value: number;
  label: string;
  semestres: number;
}

export default function Perfil() {
  const router = useRouter();
  const [orientador, setOrientador] = useState<Professor | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTemaAberto, setmodalTemaAberto] = useState(false);
  const [temaTitulo, setTemaTitulo] = useState("");
  const [temaDescricao, setTemaDescricao] = useState("");
  const [temaPalavrasChave, setTemaPalavrasChave] = useState("");
  const [modalEditarPerfilAberto, setmodalEditarPerfilAberto] = useState(false);
  const [cursos, setCursos] = useState<CursoSelect[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number, label: string }[]>([]);
  const { usuario, setUsuario } = useAuth();

  useAlertaTemporario({ erro, sucesso, setErro, setSucesso, setMostrarAlerta });

  useEffect(() => {
    if (usuario) {
      setFormData({
        ...usuario,
        curso: usuario.role === "ESTUDANTE" ? (usuario as Estudante).curso?.id || "" : "",
      });
    }
  }, [usuario]);
  
  

  const cadastrarTema = async (e: React.FormEvent) => {
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
      setmodalTemaAberto(false);
      router.refresh();
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
        const cursoUsuario = cursosMapeados.find((c: { value: number }) => c.value === Number(cursoId));        
        if (cursoUsuario) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  
      router.refresh();
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

      const atualizado = await response.json();
      setUsuario(atualizado);

      setmodalEditarPerfilAberto(false);
      setSucesso("Atualizado com sucesso!");
      setErro("");
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
  
    setmodalEditarPerfilAberto(false);
  };

  useEffect(() => {
    const fetchOrientador = async () => {
      if (!usuario || !(usuario as Estudante).tema?.professor) return;
  
      try {
        const res = await fetch(`http://localhost:8080/professores/${(usuario as Estudante).tema?.professor.id}`, {
          credentials: "include",
        });
  
        if (res.ok) {
          const orientador = await res.json();
          setOrientador(orientador);
          console.log(orientador);
        } else {
          throw new Error("Erro ao buscar orientador");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
  
    fetchOrientador();
  }, [usuario]);

  if (!usuario) return <Loading />;

  return (
    <div className={styles.main}>
      {sucesso && mostrarAlerta && <Alerta text={sucesso} theme="sucesso" top="10rem" />}
      {erro && mostrarAlerta && <Alerta text={erro} theme="erro" top="10rem" />}

      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
        // <div className={`${styles.alerta} ${erro ? styles.erro : styles.sucesso}`}>
        //   {erro || sucesso}
        // </div>
      )}
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
              <button className={styles.editBtn} onClick={() => setmodalEditarPerfilAberto(true)}>Editar</button>
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
                          width="17rem"
                          top="1.7rem"
                          icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
                          items={[
                            { type: "link", label: "", href: "" },
                            { type: "action", label: "Editar", onClick: () => setmodalTemaAberto(true)},
                            { type: "action", label: "Remover", onClick: handleRemoverTema },
                            { type: "action", label: "Adicionar Estudante", onClick: handleRemoverTema },
                            { type: "action", label: "Cancelar Orientação", onClick: handleRemoverTema },
                          ]}
                        />
                      </div>
                      {(usuario as Estudante).tema?.statusTema && (
                          <StatusBadge status={(usuario as Estudante).tema?.statusTema as StatusTipo} />
                      )}
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
                    <ButtonAuth text="Adicionar Tema" type="button" theme="primary" onClick={() => setmodalTemaAberto(true)} />
                  </>
                )}
              </div>

                  
              <div className={styles.card_orientador}>
                <h2>Orientador</h2>
                {(usuario as Estudante).tema?.professor ? (
                    <div className={styles.card_perfil}>
                      <div className={styles.profile}>
                        {orientador?.profileImage ? (
                          <Image src={orientador?.profileImage} alt="Foto de perfil" width={100} height={100} className={styles.profileImage} />
                        ) : (
                          <div className={styles.initials}>{getInitials(orientador?.nome)}</div>
                        )}
                      </div>
                        <div className={styles.detalhes}>
                          <h1>{orientador?.nome}</h1>
                          <p>{orientador?.email}</p>
                          {orientador?.disponibilidade && (
                              <StatusBadge status={orientador?.disponibilidade as StatusTipo} />
                          )}
                        </div>
                        <div className={styles.editar}>
                          <button className={styles.editBtn}>Visualizar</button>
                        </div>
                    </div>
                  ) : (
                    <>
                      <p>Não possui um tema cadastrado.</p>
                      <ButtonAuth text="Adicionar Tema" type="button" theme="primary" onClick={() => setmodalTemaAberto(true)} />
                    </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {modalTemaAberto && (
        <Modal onClose={() => setmodalTemaAberto(false)}>
          <h2>Cadastrar Tema</h2>
          <form name="cadastro_estudante" onSubmit={cadastrarTema}>
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
              <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={() => setmodalTemaAberto(false)} />
              <ButtonAuth text="Salvar" type="submit" theme="primary"/>
            </div>
          </form>
        </Modal>
      )}

      {modalEditarPerfilAberto && (
        <ModalEditarPerfil onClose={() => setmodalEditarPerfilAberto(false)}>
          <h2>Editar Perfil</h2>
          <form onSubmit={handleSalvarPerfil}>          
            <InputAuth label="Nome Completo" name="nome" type="text" value={formData.nome} onChange={handleChange}/>
            <InputAuth label="Data de Nascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange}/>
            <SelectAuth text="Gênero" options={generos} onChange={handleGeneroChange} selected={formData.genero} />

            {"matricula" in formData && (
              <InputAuth label="Matrícula" name="matricula" type="number" value={formData.matricula} onChange={handleChange}/>
            )}

            {usuario.role === "ESTUDANTE" && (
              <>
                {"curso" in formData && (
                  <SelectAuth text="Curso" options={cursos} onChange={handleCursoChange} selected={formData.curso} />
                )}
                {"semestre" in formData && (
                  <SelectAuth text="Semestre" options={semestresDisponiveis} onChange={handleSemestreChange} selected={formData.semestre} />
                )}
              </>
            )}

            <ButtonAuth type="button" text="Cancelar" theme="secondary" onClick={handleCancelar} />
            <ButtonAuth type="submit" text={isLoading ? <span className="spinner"></span> : "Salvar"} theme="primary"/>
          </form>
        </ModalEditarPerfil>
      )}
    </div>
  );
}