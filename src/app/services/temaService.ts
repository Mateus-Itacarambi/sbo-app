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

// export const atualizarTema = async (idTema: string, dados: TemaPayload) => {
//   const response = await fetch(`/temas/${idTema}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify(dados),
//   });
//   if (!response.ok) throw new Error(await response.text());
//   return response.json();
// };

export const removerTemaEstudante = async (idEstudante: string) => {
  const response = await fetch(`/temas/estudante/${idEstudante}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
  