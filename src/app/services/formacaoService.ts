import { Professor, Formacao } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adicionarFormacao = async (usuario: Professor, dados: Formacao) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/adicionarFormacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const atualizarFormacao = async (formacaoId: number, dados: Formacao) => {
  const response = await fetch(`${API_URL}/atualizarFormacoes/${formacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};