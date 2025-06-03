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
  marcarTodasComoLidas: () => void;
}

export default function Notificacao({ visivel, onClose, notificacoes, marcarTodasComoLidas }: Props) {
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
            if (n.tipo === "ORIENTACAO" || n.tipo === "APROVADA" || n.tipo === "REJEITADA") { 
              return (
                <>
                  <Link href={`/solicitacoes`}>
                    <li key={n.id}>
                      {!n.lida && <span className={styles.lida}></span>}
                      <p>
                        {n.mensagem}<span>{n.solicitante?.nome}.</span> 
                      </p>
                      <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                    </li>
                  </Link>
                </>
              );
            }
            return null;
          })}
        </ul>
      </aside>
    </div>
  );
}
