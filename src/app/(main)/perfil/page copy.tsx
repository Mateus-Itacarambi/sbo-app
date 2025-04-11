"use client";

import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";
import Image from "next/image";
import Loading from "@/components/Loading/loading";
import InputAuth from "@/components/InputAuth";
import { useRouter } from "next/navigation";
import Alerta from "@/components/Alerta";
import ButtonAuth from "@/components/ButtonAuth";
import SelectAuth from "@/components/SelectAuth";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  genero: string;
  matricula: string;
  semestre: number;
  curso?: {
    id: number;
    nome: string;
  } | null;
  tema?: {
    id: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    areaConchecimento: string;
    statusTema: string;
  } | null;
  profileImage?: string;
  role?: string;
}

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);  
  const [formData, setFormData] = useState<Omit<Usuario, "curso"> & { curso: string }>({
    id: 0,
    nome: "",
    dataNascimento: "",
    email: "",
    genero: "",
    matricula: "",
    semestre: 0,
    curso: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        const res = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          setFormData({
            id: data.id,
            nome: data.nome,
            dataNascimento: data.dataNascimento,
            email: data.email,
            genero: data.genero,
            matricula: data.matricula,
            semestre: data.semestre,
            curso: data.curso?.nome || "",
          });
        } else {
          router.push("/login");
          console.error("Erro ao buscar usuário");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUsuario();
  }, []);

  const getInitials = (nome: string) => {
    const nomes = nome.split(" ");
    return nomes.length > 1
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch("http://localhost:8080/estudantes/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: Number(formData.id),
          nome: formData.nome,
          dataNascimento: formData.dataNascimento,
          genero: formData.genero,
          email: formData.email,
          matricula: formData.matricula,
          semestre: Number(formData.semestre),
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao atualizar perfil");
      }

      const atualizado = await response.json();
      setUsuario(atualizado);
      setEditando(false);

      setSucesso("Estudante atualizado com sucesso!");
      setErro("");
    } catch (error: any) {
      console.error("Erro ao salvar alterações:", error);

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
  
  if (!usuario) return <Loading />;

  return (
    <div className={styles.main}>
      {sucesso && mostrarMensagem && (
        <Alerta text={sucesso} theme="sucesso" />
      )}
      {erro && mostrarMensagem && <Alerta text={erro} theme="erro" />}
      <div className={styles.container}>
      <div className={styles.card_container}>
        <div className={styles.card_perfil}>
          <div className={styles.profile}>
            {usuario.profileImage ? (
              <Image
                src={usuario.profileImage}
                alt="Foto de perfil"
                width={100}
                height={100}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.initials}>
                {getInitials(usuario.nome)}
              </div>
            )}
          </div>

          <div className={styles.details}>
            <h1>{usuario.nome}</h1>
            <p>{usuario.email}</p>
            <p>{usuario.curso?.nome}</p>
          </div>
          <div className={styles.editar}>
            <button className={styles.editBtn}>Editar</button>
          </div>
        </div>

        <div className={styles.card}>
          <form className={styles.form}>
            <InputAuth
              label="Nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              disabled={!editando}
            />
            <InputAuth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              disabled={!editando}
            />
            <InputAuth
              label="Data de Nascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              disabled={!editando}
            />
            
            <InputAuth
              label="Gênero"
              type="text"
              value={formData.genero}
              onChange={handleChange}
              placeholder="Masculino/Feminino"
              disabled={!editando}
            />
            <InputAuth
              label="Matrícula"
              type="text"
              value={formData.matricula}
              onChange={handleChange}
              disabled={!editando}
            />
            <InputAuth
              label="Curso"
              type="text"
              value={formData.curso}
              onChange={() => {}}
              disabled
            />
            <InputAuth
              label="Semestre"
              type="text"
              value={formData.semestre.toString()}
              onChange={handleChange}
              disabled={!editando}
            />
          </form>

            {usuario.role === "ESTUDANTE" && (
              <>
                <p><strong>Matrícula:</strong> {usuario.matricula}</p>
                <p><strong>Semestre:</strong> {usuario.semestre || "Não definido"}</p>
                <p><strong>Curso:</strong> {usuario.curso?.nome || "Não definido"}</p>
              </>
            )}
        </div>
        <div className={styles.card}>
          <div className={styles.profile}>
            {usuario.profileImage ? (
              <Image
                src={usuario.profileImage}
                alt="Foto de perfil"
                width={100}
                height={100}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.initials}>
                {getInitials(usuario.nome)}
              </div>
            )}
            <h2>{usuario.nome}</h2>
            <p>{usuario.email}</p>
            <button className={styles.editBtn}>Editar perfil</button>
          </div>

          <div className={styles.details}>
            <h3>Informações</h3>
            <p><strong>Gênero:</strong> {usuario.genero}</p>
            <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
            <p><strong>Tipo de conta:</strong> {usuario.role}</p>

            {usuario.role === "ESTUDANTE" && (
              <>
                <p><strong>Matrícula:</strong> {usuario.matricula}</p>
                <p><strong>Semestre:</strong> {usuario.semestre || "Não definido"}</p>
                <p><strong>Curso:</strong> {usuario.curso?.nome || "Não definido"}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.profile}>
            {usuario.profileImage ? (
              <Image
                src={usuario.profileImage}
                alt="Foto de perfil"
                width={100}
                height={100}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.initials}>
                {getInitials(usuario.nome)}
              </div>
            )}
            <h2>{usuario.nome}</h2>
            <p>{usuario.email}</p>
            <button className={styles.editBtn}>Editar perfil</button>
          </div>

          <div className={styles.details}>
            <h3>Informações</h3>
            <p><strong>Gênero:</strong> {usuario.genero}</p>
            <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
            <p><strong>Tipo de conta:</strong> {usuario.role}</p>

            {usuario.role === "ESTUDANTE" && (
              <>
                <p><strong>Matrícula:</strong> {usuario.matricula}</p>
                <p><strong>Semestre:</strong> {usuario.semestre || "Não definido"}</p>
                <p><strong>Curso:</strong> {usuario.curso?.nome || "Não definido"}</p>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
