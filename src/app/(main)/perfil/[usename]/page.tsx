"use client"

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string; // Pode ser "estudante" ou "professor"
  nome: string;
  // Adicione outros campos conforme necessário
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      setUser({
        email: decodedToken.sub, // Email
        role: decodedToken.role, // Role (estudante ou professor)
        nome: decodedToken.nome, // Nome do usuário, se incluído no token
      });
    } catch (error) {
      localStorage.removeItem('authToken');
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Bem-vindo, {user.nome}!</h2>
          <p>Email: {user.email}</p>
          <p>Tipo de usuário: {user.role}</p>

          {/* Exiba conteúdo específico para Estudante ou Professor */}
          {user.role === 'ESTUDANTE' ? (
            <p>Conteúdo específico para Estudante</p>
          ) : (
            <p>Conteúdo específico para Professor</p>
          )}
        </div>
      ) : (
        <p>Não conseguimos carregar as informações do usuário.</p>
      )}
    </div>
  );
}
