import { Estudante, Professor } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const solicitarOrientacao = async (estudante: Estudante, professorId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/solicitarOrientacao/${estudante.id}/${professorId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const aprovarSolicitacao = async (professor: Professor, solicitacaoId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/${solicitacaoId}/aprovar/${professor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const rejeitarSolicitacao = async (e: React.FormEvent, professor: Professor, solicitacaoId: number, motivo: string) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/solicitacoes/${solicitacaoId}/rejeitar/${professor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      motivo: motivo
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const cancelarOrientacao = async (e: React.FormEvent, solicitacaoId: number, motivo: string) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/solicitacoes/cancelar/${solicitacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      motivo: motivo
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};