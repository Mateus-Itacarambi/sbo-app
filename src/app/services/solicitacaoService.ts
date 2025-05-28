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