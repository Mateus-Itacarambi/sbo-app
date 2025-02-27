"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/app/components/ButtonAuth";
import SelectAuth from "@/app/components/SelectAuth";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");
  const [cursos, setCursos] = useState<{ value: number; label: string; semestres: number }[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number; label: string }[]>([]);

  const generos = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
  ];

  // Função para buscar cursos do backend
  useEffect(() => {
    async function fetchCursos() {
      try {
        const response = await fetch("http://localhost:8080/cursos");
        const data = await response.json();
  
        // Extraindo apenas a lista de cursos dentro de "content"
        setCursos(data.content.map((curso: any) => ({ 
          value: curso.id, 
          label: curso.nome,
          semestres: curso.semestres })));
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }
  
    fetchCursos();
  }, []);

  const handleCursoChange = (cursoId: string) => {
    setCurso(cursoId);
  
    // Encontrar o curso selecionado e gerar os semestres
    const cursoSelecionado = cursos.find(curso => curso.value === Number(cursoId));
    if (cursoSelecionado) {
      const semestres = Array.from({ length: cursoSelecionado.semestres }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}º Semestre`
      }));
      setSemestresDisponiveis(semestres);
      setSemestre(""); // Reseta o semestre ao mudar o curso
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const estudante = {
      nome,
      dataNascimento,
      genero,
      email,
      senha,
      matricula,
      semestre: Number(semestre), // Ajustado para "semestre"
      idCurso: Number(curso), // Ajustado para "idCurso"
    };
    
    try {
      const response = await fetch("http://localhost:8080/estudantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudante),
      });
    
      if (!response.ok) {
        throw new Error("Erro ao cadastrar estudante");
      }
    
      alert("Estudante cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar estudante.");
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.cadastro}>
          <h1>Cadastro de Conta</h1>
          <p>Seja bem-vindo! Crie seu acesso rapidamente.</p>

          <form name="cadastro_estudante"  onSubmit={handleSubmit}>
            <InputAuth
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            
            <InputAuth
              label="Data de nascimento"
              type="date"
              placeholder=""
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />

            <SelectAuth 
              options={generos} 
              onChange={(value) => setGenero(value)} 
              text="Gênero" 
              placeholder="Selecione um gênero" 
            />

            <SelectAuth 
              options={cursos} 
              onChange={handleCursoChange} 
              text="Curso" 
              placeholder="Selecione um curso"
            />

            <SelectAuth 
              options={semestresDisponiveis} 
              onChange={(value) => setSemestre(value)} 
              text="Semestre" 
              placeholder="Selecione um semestre" 
            />
            
            <InputAuth
              label="Matrícula"
              type="text"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
            
            <InputAuth
              label="E-mail"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <InputAuth
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <ButtonAuth text="Cancelar" type="reset" theme="secondary"/>
            <ButtonAuth text="Cadastrar" type="submit" theme="primary"/>
          </form>
          <p>Já possui uma conta? <Link href={"/auth/login"}><span>Login</span></Link></p>
        </div>
      </section>
    </div>
  );
}
