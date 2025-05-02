const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TemaPayload {
  titulo: string;
  palavrasChave: string;
  descricao: string;
}
  
export const listarTemasEstudante = async (id: string) => {
  const response = await fetch(`/temas/estudante/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const cadastrarTema = async (e: React.FormEvent, idEstudante: number, dados: TemaPayload) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/estudante/${idEstudante}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const atualizarTema = async (e: React.FormEvent, idTema: number, idEstudante: number,  dados: TemaPayload) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${idTema}/atualizar/${idEstudante}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar tema!");
  }

  return await response.json();
};

export const removerTema = async (idTema: number, idEstudante: number) => {
  const response = await fetch(`${API_URL}/temas/${idTema}/deletar/${idEstudante}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
};

export const adicionarEstudanteTema = async (e: React.FormEvent, idTema: number, idEstudante: number,  matricula: string) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${idTema}/adicionarEstudante/${idEstudante}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      matricula: matricula
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao adicionar estudante!");
  }

  return await response.json();
};

export const removerEstudanteTema = async (e: React.FormEvent, idTema: number, idEstudante: number,  matricula: string) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${idTema}/removerEstudante/${idEstudante}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      matricula: matricula
    }),
  });
  
  if (!response.ok) throw new Error(await response.text());
};
  