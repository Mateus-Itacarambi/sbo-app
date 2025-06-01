import { Estudante } from "@/types";

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

export const cancelarOrientacao = async (temaId: number, motivo: string) => {
  const response = await fetch(`${API_URL}/solicitacoes/cancelar/${temaId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      motivo: motivo
    }),
  });

  if (!response.ok) throw new Error(await response.text());
};