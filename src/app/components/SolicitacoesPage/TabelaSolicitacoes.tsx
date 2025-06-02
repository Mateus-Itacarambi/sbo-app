import { Solicitacao, statusMap, tipoMap } from "@/types/solicitacao";
import styles from "./solicitacoesPage.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";
import { X, Search } from "lucide-react";
import SelectAuth from "@/components/SelectAuth";

interface TabelaSolicitacoesProps {
  solicitacoes: Solicitacao[];
  mostrarFiltros: boolean;
  filtros: any;
  setFiltros: (f: any) => void;
}

export default function TabelaSolicitacoes({ solicitacoes, mostrarFiltros, filtros, setFiltros }: TabelaSolicitacoesProps) {
  const { usuario } = useAuth();
  const solicitacaoActions = useSolicitacaoActions(usuario);

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
                  padding=".7rem 1rem"
                  margin="0"
                />
              </td>
              <td>
                <SelectAuth
                  options={tipoOptions}
                  onChange={(tipo) => setFiltros({ ...filtros, tipo })}
                  name="tipo"
                  height="auto"
                  padding=".7rem 1rem"
                  margin="0"
                />
              </td>
              <td></td>
            </tr>
          )}
      </thead>
      <tbody>
        {solicitacoes.map((s) => (
          <tr key={s.id}>
            <td>
              {usuario?.role === "PROFESSOR" ? (
                s.estudante?.nome
              ) : (
                s.professor?.nome
              )}
            </td>
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
  );
}
