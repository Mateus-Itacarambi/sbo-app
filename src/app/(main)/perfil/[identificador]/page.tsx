import Perfil from "@/components/Perfil/Perfil";
import { cookies } from "next/headers";

export default async function PerfilPage({ params }: { params: { identificador: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`http://localhost:8080/usuarios/${params.identificador}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Usuário não encontrado");
  }

  const usuario = await res.json();

  return <Perfil usuarioVisualizado={usuario} />;
}
