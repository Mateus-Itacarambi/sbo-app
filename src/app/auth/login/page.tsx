"use client";

import Link from "next/link"
import styles from "./page.module.scss"
import InputAuth from "../../components/InputAuth"
import { useState } from "react";
import ButtonAuth from "@/app/components/ButtonAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.login}>
          <h1>BEM-VINDO DE VOLTA</h1>
          <p>Bem-vindo de volta! Por favor, entre com suas credenciais.</p>
          
          <form action="">
            <InputAuth
              label="E-mail"
              type="email"
              placeholder="Entre com seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputAuth
              label="Senha"
              type="password"
              placeholder="***************"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Link href="/auth/recuperar-senha">
              <p>Esqueceu sua senha?</p>
            </Link>

            <ButtonAuth text="Acessar" type="submit" theme="primary"/>

            <p>Não tem uma conta? <Link href="/auth/estudante-cadastro"><span>Cadastra-se</span></Link></p>
          </form>
        </div>
      </section>
    </div>
  );
}
