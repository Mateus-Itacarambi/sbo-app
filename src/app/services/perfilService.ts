import { UsuarioCompleto } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function atualizarPerfil(e: React.FormEvent, usuario: UsuarioCompleto, formData: any) {
  if (!usuario) return;
  
  e.preventDefault();
  const endpoint = usuario.role === "ESTUDANTE" ? "/estudantes" : "/professores";
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar perfil");
  }

  return await response.json();
}
