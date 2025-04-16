"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/components/ButtonAuth";
import Alerta from "@/components/Alerta";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const error = await response.text();
        setErro(error);
        console.error("Erro ao fazer login:", error);
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="teste"></div>
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

            <Link href="/recuperar-senha">
              <p>Esqueceu sua senha?</p>
            </Link>

            <ButtonAuth
              text={isLoading ? <span className="spinner"></span> : "Acessar"}
              type="submit"
              theme="primary"
              disabled={isLoading}
            />

            <p>
              Não tem uma conta?{" "}
              <Link href="/estudante-cadastro">
                <span>Cadastra-se</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
