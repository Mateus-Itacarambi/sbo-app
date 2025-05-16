import { Professor, CursoProfessor } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adicionarCursos = async (usuario: Professor, dados: CursoProfessor[]) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/adicionarCursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados.map(curso => curso.id)),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const removerCurso = async (usuario: Professor, cursoId: number) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/removerCurso/${cursoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
};