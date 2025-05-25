"use client";
import { useEffect } from "react";
import styles from "./notificacao.module.scss";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Notificacao {
  id: number;
  conteudo: string;
  data: string;
  tipo: "orientacao" | "tema";
}

interface Props {
  visivel: boolean;
  onClose: () => void;
}

export default function AsideNotificacoes({ visivel, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const notificacoes: Notificacao[] = [
    { id: 1, conteudo: "Nova solicitação de orientação: ", data: new Date().toISOString(), tipo: "orientacao" },
    { id: 2, conteudo: "tem interesse no tema: Análise Preditiva de Evasão Escolar com Algoritmos de Machine Learning.", data: new Date().toISOString(), tipo: "tema"  },
  ];

  return (
    <div className={`${styles.overlay} ${visivel ? styles.aberto : ""}`} onClick={onClose}>
      <aside className={styles.aside} onClick={(e) => e.stopPropagation()}>
        <h1>
            <ChevronLeft style={{cursor: "pointer"}} size={"30px"} strokeWidth={"2px"} onClick={() => onClose()} />
            Notificações
        </h1>
        <ul>
          {notificacoes.map((n) => (
            <>
              {n.tipo === "orientacao" ? (
                <li key={n.id}>
                  <span className={styles.lida}></span>
                  <p>{n.conteudo}<Link href={"/perfil/20220403000005"} target="_blank">Mateus Itacarambi</Link>.</p>
                  <small>{new Date(n.data).toLocaleString()}</small>
                </li>
              ) : (
                <li key={n.id}>
                  <span className={styles.lida}></span>
                  <p><Link href={"/perfil/20220403000005"} target="_blank">Mateus Itacarambi</Link> {n.conteudo}</p>
                  <small>{new Date(n.data).toLocaleString()}</small>
                </li>
              )}
            </>
          ))}
        </ul>
      </aside>
    </div>
  );
}
