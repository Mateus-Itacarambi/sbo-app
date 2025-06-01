"use client";
import { useEffect, useState } from "react";
import styles from "./notificacao.module.scss";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NotificacaoDTO } from "@/types/notificacao";
import { UserPlus } from 'lucide-react';

interface Props {
  visivel: boolean;
  onClose: () => void;
  notificacoes: NotificacaoDTO[];
  setNotificacoes: React.Dispatch<React.SetStateAction<NotificacaoDTO[]>>;
}

export default function Notificacao({ visivel, onClose, notificacoes, setNotificacoes }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const marcarTodasComoLidas = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notificacoes/marcar-todas-lidas`, {
        method: "PUT",
        credentials: "include",
      });

      setNotificacoes((prev) =>
        prev.map((n) => ({ ...n, lida: true }))
      );
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  return (
    <div className={`${styles.overlay} ${visivel ? styles.aberto : ""}`} onClick={onClose}>
      <aside className={styles.aside} onClick={(e) => e.stopPropagation()}>
        <h1>
            <ChevronLeft style={{cursor: "pointer"}} size={"30px"} strokeWidth={"2px"} onClick={() => { onClose(); marcarTodasComoLidas(); }} />
            Notificações
        </h1>
        <div className={styles.solicitacoes}>
          <span className={styles.icon}>
            <UserPlus style={{ transform: "scaleX(-1)" }} />
            {notificacoes.length > 0 && (
              <span className={styles.sinal}></span>
            )}
          </span>
          <p>
            Solicitações pendentes
            <span>Acompenhe suas solicitações aqui</span>
          </p>
        </div>
        <ul>
          {notificacoes.map((n) => {
            if (n.tipo === "ORIENTACAO" || n.tipo === "APROVADA" || n.tipo === "REPROVADA") { 
              return (
                <li key={n.id}>
                  {!n.lida && <span className={styles.lida}></span>}
                  <p>
                    {n.mensagem}
                    <Link href={`/perfil/${n.solicitante?.slug}`} target="_blank">
                      {n.solicitante?.nome}
                    </Link>.
                  </p>
                  <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </aside>
    </div>
  );
}
