import { Solicitacao, tipoMap } from "@/types/solicitacao";
import styles from "./solicitacoesPage.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";
import { X, Search, Eye, EyeOff } from "lucide-react";
import SelectAuth from "@/components/SelectAuth";
import Link from "next/link";
import React, { useRef, useState } from "react";
import StatusBadge from "../StatusBadge";
import { StatusTipo } from "@/types";
import ModalCancelarSolicitacao from "../Modal/ModalCancelarSolicitacao";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { m } from "framer-motion";

interface TabelaSolicitacoesProps {
  solicitacoes: Solicitacao[];
  mostrarFiltros: boolean;
  filtros: any;
  setFiltros: (f: any) => void;
}

export default function TabelaSolicitacoes({ solicitacoes, mostrarFiltros, filtros, setFiltros }: TabelaSolicitacoesProps) {
  const { isLoading } = useAlertaTemporarioContext();
  const [modalCanelarSolicitacao, setModalCanelarSolicitacao] = useState(false);
  const [modalRejeitarSolicitacao, setModalRejeitarSolicitacao] = useState(false);
  const [solicitacaoIdSelecionada, setSolicitacaoIdSelecionada] = useState<number | null>(null);
  const [loading, setLoading] = useState<{ id: number; tipo: "APROVAR" | "REJEITAR" | "CANCELAR" } | null>(null);
  const { usuario } = useAuth();
  const solicitacaoActions = useSolicitacaoActions(usuario);
  const [motivoAberto, setMotivoAberto] = useState<number[]>([]);

  const cancelarOrientacao = async (e: React.FormEvent, solicitacaoId: number, motivo: string) => {
      if (usuario?.role === "PROFESSOR") {
        await solicitacaoActions.handleCancelarOrientacao(e, solicitacaoId, motivo);
      } else {
        await solicitacaoActions.handleCancelarOrientacao(e, solicitacaoId, motivo);
      }
    // } finally {
    //   setLoading(null);
    // }
  };

  const aprovarOrientacao = async (solicitacaoId: number) => {
    // setLoading({ id: solicitacaoId, tipo: "APROVAR" });
    // try {
      solicitacaoActions.handleAprovarSolicitacao(solicitacaoId);
    // } finally {
    //   setLoading(null);
    // }
  };

  const rejeitarOrientacao = async (e: React.FormEvent, solicitacaoId: number, motivo: string) => {
    // setLoading({ id: solicitacaoId, tipo: "REJEITAR" });
    // try {
      await solicitacaoActions.handleRejeitarSolicitacao(e, solicitacaoId, motivo);
    // } finally {
    //   setLoading(null);
    // }
  };

  const toggleMotivo = (id: number) => {
    setMotivoAberto((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "PENDENTE", label: "Pendente" },
    { value: "APROVADA", label: "Aprovada" },
    { value: "REJEITADA", label: "Rejeitada" },
    { value: "CANCELADA", label: "Cancelada" },
    { value: "CONCLUIDA", label: "Concluída" },
  ];

  const tipoOptions = [
    { value: "", label: "Todos" },
    { value: "TEMA", label: "Tema" },
    { value: "ORIENTACAO", label: "Orientação" },
  ];

  const limparCampoNome = () => {
    setFiltros({ ...filtros, nomeEstudante: "", nomeProfessor: "" });
  };

  const limparCampoTema = () => {
    setFiltros({ ...filtros, tituloTema: "" });
  };

  return (
    <>
      <table className={styles.tabela}>
        <thead>
          <tr>
            {usuario?.role === "PROFESSOR" ? (
              <th>Estudante</th>
            ) : (
              <th>Professor</th>
            )}
            <th>Tema</th>
            <th>Status</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
            {mostrarFiltros && (
              <tr className={styles.filtros}>
                <td>
                  {usuario?.role === "PROFESSOR" ? (
                    <div className={styles.inputComIcone}>
                      <input
                        name="nomeEstudante"
                        placeholder="Filtrar nome"
                        value={filtros.nomeEstudante}
                        onChange={(e) => setFiltros({ ...filtros, nomeEstudante: e.target.value })}
                      />
                      {filtros.nomeEstudante ? (
                        <X className={styles.icone} onClick={limparCampoNome} />
                      ) : (
                        <Search className={styles.icone} />
                      )}
                    </div>
                  ) : (
                    <div className={styles.inputComIcone}>
                      <input
                        name="nomeProfessor"
                        placeholder="Filtrar nome"
                        value={filtros.nomeProfessor}
                        onChange={(e) => setFiltros({ ...filtros, nomeProfessor: e.target.value })}
                      />
                      {filtros.nomeProfessor ? (
                        <X className={styles.icone} onClick={limparCampoNome} />
                      ) : (
                        <Search className={styles.icone} />
                      )}
                    </div>
                  )}
                </td>
                <td>
                  <div className={styles.inputComIcone}>
                    <input
                      name="tema"
                      placeholder="Filtrar tema"
                      value={filtros.tituloTema}
                      onChange={(e) => setFiltros({ ...filtros, tituloTema: e.target.value })}
                    />
                    {filtros.tituloTema ? (
                      <X className={styles.icone} onClick={limparCampoTema} />
                    ) : (
                      <Search className={styles.icone} />
                    )}
                  </div>
                </td>
                <td>
                  <SelectAuth
                    options={statusOptions}
                    onChange={(status) => setFiltros({ ...filtros, status })}
                    name="status"
                    height="auto"
                    padding=".6rem 1rem"
                    margin="0"
                    fontSize="1.4rem"
                  />
                </td>
                <td>
                  <SelectAuth
                    options={tipoOptions}
                    onChange={(tipo) => setFiltros({ ...filtros, tipo })}
                    name="tipo"
                    height="auto"
                    padding=".6rem 1rem"
                    margin="0"
                    fontSize="1.4rem"
                  />
                </td>
                <td></td>
              </tr>
            )}
        </thead>
        <tbody>
          {solicitacoes.map((s) => (
            <React.Fragment key={s.id}>
              <tr key={s.id}>
                <td>
                  {usuario?.role === "PROFESSOR" ? (
                    <Link href={`/perfil/${s.estudante?.slug}`} target="_blank">
                      {s.estudante?.nome}
                    </Link>
                  ) : (
                    <Link href={`/perfil/${s.professor?.slug}`} target="_blank">
                      {s.professor?.nome}
                    </Link>
                  )}
                </td>
                <td>{s.tema?.titulo}</td>
                <td>
                  <StatusBadge status={s.status as StatusTipo} />
                </td>
                <td>{tipoMap[s.tipo]}</td>
                <td style={{ width: "100%", display: "flex", gap: "1rem", justifyContent: "center" }}>
                  {s.status === "PENDENTE" ? (
                    usuario?.role === "PROFESSOR" ? (
                      <>
                        <button title="Aprovar" className={styles.aprovar} onClick={() => aprovarOrientacao(s.id)} disabled={loading?.id === s.id}>
                          {loading?.id === s.id && loading?.tipo === "APROVAR"
                            ? <span className={styles.spinner}></span>
                            : "Aprovar"}
                        </button>
                        <button title="Rejeitar" className={styles.rejeitar} onClick={() => { setSolicitacaoIdSelecionada(s.id); setModalRejeitarSolicitacao(true); }} >
                          {loading?.id === s.id && loading?.tipo === "REJEITAR"
                            ? <span className={styles.spinner}></span>
                            : "Rejeitar"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button title="Cancelar" className={styles.rejeitar} onClick={() => { setSolicitacaoIdSelecionada(s.id); setModalCanelarSolicitacao(true) }}>Cancelar</button>
                      </>
                    )
                  ) : s.status === "APROVADA" ? (
                    <button title="Cancelar" className={styles.rejeitar} onClick={() => setModalCanelarSolicitacao(true)}>Cancelar</button>
                  ) : (
                    <button title="Mostrar/Ocultar Motivo" className={styles.ver} onClick={() => toggleMotivo(s.id)}>
                      {motivoAberto.includes(s.id) ? (
                        <>
                          <EyeOff size={"14px"} strokeWidth={"3px"}/>
                          Ocultar Motivo
                        </>
                      ) : (
                        <>
                          <Eye size={"14px"} strokeWidth={"3px"}/>
                          Mostrar Motivo
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
              {motivoAberto.includes(s.id) && (
                <tr>
                  <td colSpan={5} style={{ padding: "1rem 0" }}>
                    <div className={styles.motivo}>
                      <strong>Motivo:</strong> {s.motivo || "Não informado"}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {(modalCanelarSolicitacao || modalRejeitarSolicitacao) && (
        <ModalCancelarSolicitacao
          titulo={modalCanelarSolicitacao ? "Cancelar Solicitação" : "Rejeitar Solicitação"}
          onClose={() => {
            setModalCanelarSolicitacao(false);
            setModalRejeitarSolicitacao(false);
            setSolicitacaoIdSelecionada(null);
          }}
          onSubmit={(e, motivo) => {
            if (solicitacaoIdSelecionada !== null) {
              modalCanelarSolicitacao
                ? cancelarOrientacao(e, solicitacaoIdSelecionada, motivo)
                : rejeitarOrientacao(e, solicitacaoIdSelecionada, motivo);
            }
          }}
          isLoading={isLoading}
          textoBotao="Concluir"
        />
      )}
    </>
  );
}
