"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/app/components/ButtonAuth";
import Alerta from "@/app/components/Alerta";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);

  useEffect(() => {
    if (erro || sucesso) {
      setmostrarMensagem(true);

      const timer = setTimeout(() => {
        setmostrarMensagem(false);
        setErro(""); // Limpa o erro após esconder o alerta
        setSucesso("");
      }, 3000); // Esconde após 5 segundos

      return () => clearTimeout(timer); // Limpa o timer anterior ao definir um novo erro
    }
  }, [erro, sucesso]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // Armazenar o token JWT no localStorage ou Cookie
      localStorage.setItem("authToken", token);
      const decodedToken: any = jwtDecode(token);

      console.log(decodedToken.nome);

      // Redirecionar para a página principal ou dashboard
      window.location.href = "/dashboard"; // Exemplo de redirecionamento
      setErro("");
    } else {
      setErro("Credenciais inválidas. Tente novamente.");
      setSucesso("");
    }
  };

  return (
    <div className={styles.container}>
      <section>
        {sucesso && mostrarMensagem && (
          <Alerta text={sucesso} theme="sucesso" />
        )}
        {erro && mostrarMensagem && <Alerta text={erro} theme="erro" />}
        <div className={styles.login}>
          <h1>BEM-VINDO DE VOLTA</h1>
          <p>Bem-vindo de volta! Por favor, entre com suas credenciais.</p>

          <form onSubmit={handleLogin}>
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

            <ButtonAuth text="Acessar" type="submit" theme="primary" />

            <p>
              Não tem uma conta?{" "}
              <Link href="/auth/estudante-cadastro">
                <span>Cadastra-se</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
