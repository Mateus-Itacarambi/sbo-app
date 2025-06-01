"use client";

import { useEffect, useState } from "react";
import styles from "./solicitacoes.module.scss";
import { Solicitacao, statusMap, tipoMap } from "@/types/solicitacao";
import { useAuth } from "@/contexts/AuthContext";
import { Estudante, Professor } from "@/types";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

export default function SolicitacoesPage() {
  const { usuario } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const solicitacaoActions = useSolicitacaoActions(usuario);

  useEffect(() => {
    if (!usuario) return;
    
    const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
    const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;
    const endpoint = estudante ? `estudante` : professor ? `professor` : "";

    const fetchSolicitacoes = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitacoes/${endpoint}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setSolicitacoes(data.content);
      }
    };

    fetchSolicitacoes();
  }, [usuario]);

  const cancelarOrientacao = async (temaId: number, motivo: string) => {
    if (usuario?.role === "PROFESSOR") {
      await solicitacaoActions.handleCancelarOrientacao(temaId, motivo);
    } else {
      await solicitacaoActions.handleCancelarOrientacao(temaId, "");
    }
  };

  const handleFiltrarStatus = (filtro: string) => {
    setFiltroStatus(filtro);
  };

  const handleFiltrarTipo = (filtro: string) => {
    setFiltroTipo(filtro);
  };

  const solicitacoesFiltradas = solicitacoes.filter((s) => {
    const filtroStatusOk = !filtroStatus || s.status === filtroStatus;
    const filtroTipoOk = !filtroTipo || s.tipo === filtroTipo;
    return filtroStatusOk && filtroTipoOk;
  });

  return (
    <div className={styles.container}>
      <h1>Solicitações de Orientação</h1>

      <div className={styles.filtro}>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={filtroStatus}
          onChange={(e) => handleFiltrarStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="APROVADA">Aprovada</option>
          <option value="REJEITADA">Rejeitada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
      </div>

      <div className={styles.filtro}>
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          value={filtroTipo}
          onChange={(e) => handleFiltrarTipo(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="TEMA">Tema</option>
          <option value="ORIENTACAO">Orientação</option>
        </select>
      </div>


      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome do Estudante</th>
            <th>Tema</th>
            <th>Status</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoesFiltradas.map((s) => (
            <tr key={s.id}>
              <td>{s.estudante?.nome}</td>
              <td>{s.tema?.titulo}</td>
              <td>{statusMap[s.status]}</td>
              <td>{tipoMap[s.tipo]}</td>
              <td>
                {s.status === "PENDENTE" ? (
                  <>
                    <button title="Aprovar" onClick={() => cancelarOrientacao(s.id, "")}>✓</button>
                    <button title="Rejeitar">✗</button>
                  </>
                ) : (
                  <button title="Ver Detalhes">👁 Ver</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
