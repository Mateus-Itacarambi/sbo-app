"use client";

import Link from "next/link"
import styles from "./page.module.scss"
import InputAuth from "../../components/InputAuth"
import { useState } from "react";
import ButtonAuth from "@/app/components/ButtonAuth";
import SelectAuth from "@/app/components/SelectAuth";

export default function Login() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmar, setSenhaConfirmar] = useState("");
  const [genero, setGenero] = useState("");
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");

  const generos = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
  ];

  const cursos = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
  ];

  const semestres = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
  ];

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.cadastro}>
          <h1>Cadastro de Conta</h1>
          <p>Seja bem-vindo! Crie seu acesso rapidamente.</p>

          <form action="" method="post">
            <InputAuth
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <InputAuth
              label="Telefone"
              type="tel"
              placeholder="Digite seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
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
              onChange={(value) => setCurso(value)} 
              text="Curso" 
              placeholder="Selecione um curso"
            />

            <SelectAuth 
              options={semestres} 
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
            
            <InputAuth
              label="Confirmar senha"
              type="password"
              placeholder="Confirme sua senha"
              value={senhaConfirmar}
              onChange={(e) => setSenhaConfirmar(e.target.value)}
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
