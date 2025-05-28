"use client";
import { useEffect } from "react";
import styles from "./notificacao.module.scss";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NotificacaoDTO } from "@/types/notificacao";

interface Props {
  visivel: boolean;
  onClose: () => void;
  notificacoes: NotificacaoDTO[];
}

export default function Notificacao({ visivel, onClose, notificacoes }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  return (
    <div className={`${styles.overlay} ${visivel ? styles.aberto : ""}`} onClick={onClose}>
      <aside className={styles.aside} onClick={(e) => e.stopPropagation()}>
        <h1>
            <ChevronLeft style={{cursor: "pointer"}} size={"30px"} strokeWidth={"2px"} onClick={() => onClose()} />
            Notificações
        </h1>
        <ul>
          {Array.isArray(notificacoes) &&
            notificacoes.map((n) => (
              <>
                {n.tipo === "ORIENTACAO" ? (
                  <li key={n.id}>
                    {!n.lida && (
                      <span className={styles.lida}></span>
                    )}
                    <p>{n.mensagem}<Link href={`/perfil/${n.solicitante?.slug}`} target="_blank">{n.solicitante?.nome}</Link>.</p>
                    <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                  </li>
                ) : n.tipo === "APROVADA" || n.tipo === "REPROVADA" ? (
                  <li key={n.id}>
                    <span className={styles.lida}></span>
                    <p>{n.mensagem}<Link href={`/perfil/${n.solicitante?.slug}`} target="_blank">{n.solicitante?.nome}</Link>.</p>
                    <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                  </li>
                ) : null }
              </>
            ))}
        </ul>
      </aside>
    </div>
  );
}
