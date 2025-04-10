"use client";

import { useEffect, useState } from "react";
import InputAuth from "@/components/auth/input/InputAuth";
import SelectAuth from "@/components/auth/select/SelectAuth";
import styles from "./editarPerfil.module.scss";

interface Curso {
  value: number;
  label: string;
  semestres: number;
}

export default function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    async function fetchCursos() {
      try {
        const response = await fetch("http://localhost:8080/cursos");
        const data = await response.json();
        setCursos(
          data.content.map((curso: any) => ({
            value: curso.id,
            label: curso.nome,
            semestres: curso.semestres,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    async function fetchUsuario() {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });
        const usuario = await response.json();

        setNome(usuario.nome);
        setGenero(usuario.genero);
        setCurso(String(usuario.curso?.id || ""));
        setSemestre(String(usuario.semestre || ""));

        if (usuario.curso?.semestres) {
          const semestres = Array.from(
            { length: usuario.curso.semestres },
            (_, i) => ({
              value: i + 1,
              label: `${i + 1}º Semestre`,
            })
          );
          setSemestresDisponiveis(semestres);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchCursos();
    fetchUsuario();
  }, []);

  const handleCursoChange = (cursoId: string) => {
    setCurso(cursoId);
    setSemestre("");

    const cursoSelecionado = cursos.find(
      (c) => c.value === Number(cursoId)
    );

    if (cursoSelecionado) {
      const semestres = Array.from(
        { length: cursoSelecionado.semestres },
        (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        })
      );
      setSemestresDisponiveis(semestres);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nome,
      genero,
      cursoId: curso,
      semestre: semestre,
    };

    try {
      const response = await fetch("http://localhost:8080/estudantes/atualizar-perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao atualizar perfil");
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Editar Perfil</h2>

      <InputAuth
        label="Nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <SelectAuth
        text="Gênero"
        placeholder="Selecione seu gênero"
        options={[
          { value: "Masculino", label: "Masculino" },
          { value: "Feminino", label: "Feminino" },
          { value: "Outro", label: "Outro" },
        ]}
        onChange={(value) => setGenero(value)}
      />

      <SelectAuth
        text="Curso"
        placeholder="Selecione um curso"
        options={cursos}
        onChange={handleCursoChange}
      />

      <SelectAuth
        text="Semestre"
        placeholder="Selecione um semestre"
        options={semestresDisponiveis}
        onChange={(value) => setSemestre(value)}
      />

      <button type="submit" className={styles.btnSalvar}>
        Salvar
      </button>
    </form>
  );
}
