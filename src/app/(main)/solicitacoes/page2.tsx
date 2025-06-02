"use client";

import { useEffect, useState } from "react";
import styles from "./solicitacoes.module.scss";
import { Solicitacao, statusMap, tipoMap } from "@/types/solicitacao";
import { useAuth } from "@/contexts/AuthContext";
import { Estudante, Professor } from "@/types";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";
import { X, Search } from "lucide-react";
import SelectAuth from "@/components/SelectAuth";

export default function SolicitacoesPage() {
  const { usuario } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTema, setFiltroTema] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
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
      await solicitacaoActions.handleCancelarOrientacao(temaId, motivo);
    }
  };

  const handleFiltrarStatus = (filtro: string) => {
    setFiltroStatus(filtro);
  };

  const handleFiltrarTipo = (filtro: string) => {
    setFiltroTipo(filtro);
  };

  const limparCampoNome = () => {
    setFiltroNome("");
  };

  const limparCampoTema = () => {
    setFiltroTema("");
  };

  const solicitacoesFiltradas = solicitacoes.filter((s) => {
    const matchNome = s.estudante?.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const matchTema = s.tema.titulo.toLowerCase().includes(filtroTema.toLowerCase());
    const matchStatus = filtroStatus ? s.status === filtroStatus : true;
    const matchTipo = filtroTipo ? s.tipo === filtroTipo : true;
    return matchNome && matchTema && matchStatus && matchTipo;
  });

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card_container}>
          <div className={styles.head}>
            <h1>Solicitações de Orientação/Tema</h1>

            <button
              className={`${styles.filtros_button} ${mostrarFiltros ? styles.hidden : ""}`}
              onClick={() => setMostrarFiltros((prev) => !prev)}
            >
              {mostrarFiltros ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
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
                {mostrarFiltros && (
                  <tr className={styles.filtros}>
                    <td>
                      <div className={styles.inputComIcone}>
                        <input
                          name="nome"
                          placeholder="Filtrar nome"
                          value={filtroNome}
                          onChange={(e) => setFiltroNome(e.target.value)}
                        />
                        {filtroNome ? (
                          <X className={styles.icone} onClick={limparCampoNome} />
                        ) : (
                          <Search className={styles.icone} />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputComIcone}>
                        <input
                          name="tema"
                          placeholder="Filtrar tema"
                          value={filtroTema}
                          onChange={(e) => setFiltroTema(e.target.value)}
                        />
                        {filtroTema ? (
                          <X className={styles.icone} onClick={limparCampoTema} />
                        ) : (
                          <Search className={styles.icone} />
                        )}
                      </div>
                    </td>
                    <td>
                      <SelectAuth
                        options={[
                          { value: "", label: "Todos" },
                          { value: "PENDENTE", label: "Pendente" },
                          { value: "APROVADA", label: "Aprovada" },
                          { value: "REJEITADA", label: "Rejeitada" },
                          { value: "CANCELADA", label: "Cancelada" },
                        ]}
                        onChange={(value) => handleFiltrarTipo(value)}
                        name="status"
                      />
                    </td>
                    <td>
                      <SelectAuth
                        options={[
                          { value: "", label: "Todos" },
                          { value: "ORIENTACAO", label: "Orientação" },
                          { value: "TEMA", label: "Tema" },
                        ]}
                        onChange={(value) => handleFiltrarTipo(value)}
                        name="tipo"
                      />
                    </td>
                    <td></td>
                  </tr>
                )}
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
                      usuario?.role === "PROFESSOR" ? (
                        <>
                          <button title="Aprovar" onClick={() => solicitacaoActions.handleAprovarSolicitacao(s.id)}>✔</button>
                          <button title="Rejeitar" onClick={() => solicitacaoActions.handleRejeitarSolicitacao(s.id)}>✗</button>
                        </>
                      ) : (
                        <>
                          <button title="Cancelar" onClick={() => cancelarOrientacao(s.id, "")}>Cancelar</button>
                          {/* <button title="Rejeitar">✗</button> */}
                        </>
                      )
                    ) : (
                      <button title="Ver Detalhes">👁 Ver</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
