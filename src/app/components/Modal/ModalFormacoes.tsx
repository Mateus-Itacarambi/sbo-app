import { Formacao } from "@/types";
import Modal from "./Modal";
import InputAuth from "../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useFormacoes } from "@/hooks/useFormacoes";
import { useEffect } from "react";
import ModalEditarPerfil from "./ModalEditarPerfil";

interface ModalFormacoesProps {
  onClose: () => void;
//   onSalvar: (formacoes: Formacao[]) => void;
  formacoesIniciais?: Formacao[];
  isLoading: boolean;
}

export default function ModalFormacoes({ onClose, formacoesIniciais = [], isLoading }: ModalFormacoesProps) {
  const {
    formacoes,
    setFormacoes,
    formacaoAtual,
    setFormacaoAtual,
    editIndex,
    handleAddOrUpdate,
    handleEdit,
    handleRemove,
    resetFormacao,
  } = useFormacoes();

  // Inicializar com formacoes do professor
  useEffect(() => {
    setFormacoes(formacoesIniciais);
  }, [formacoesIniciais]);

  const handleChange = (campo: keyof Formacao, valor: string) => {
    setFormacaoAtual({ ...formacaoAtual, [campo]: campo.includes("ano") ? Number(valor) : valor });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSalvar(formacoes);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Gerenciar Formações</h2>

      <form onSubmit={handleSubmit}>
        <InputAuth label="Curso" type="text" value={formacaoAtual.curso} onChange={(e) => handleChange("curso", e.target.value)} />
        <InputAuth label="Faculdade" type="text" value={formacaoAtual.faculdade} onChange={(e) => handleChange("faculdade", e.target.value)} />
        <InputAuth label="Título" type="text" value={formacaoAtual.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />
        <InputAuth label="Ano de Início" type="number" value={formacaoAtual.anoInicio.toString()} onChange={(e) => handleChange("anoInicio", e.target.value)} />
        <InputAuth label="Ano de Conclusão" type="number" value={formacaoAtual.anoFim.toString()} onChange={(e) => handleChange("anoFim", e.target.value)} />

        <ButtonAuth type="submit" text={editIndex !== null ? "Atualizar Formação" : "Adicionar Formação"} theme="primary" />
      </form>

      <ul style={{ marginTop: "1rem" }}>
        {formacoes.map((f, idx) => (
          <li key={idx} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
            <strong>{f.curso}</strong> – {f.faculdade} ({f.anoInicio}–{f.anoFim})
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              <button onClick={() => handleEdit(idx)}>Editar</button>
              <button onClick={() => handleRemove(idx)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <ButtonAuth type="button" text="Cancelar" theme="secondary" onClick={onClose} />
        <ButtonAuth type="submit" text={isLoading ? <span className="spinner" /> : "Salvar Todas"} theme="primary" />
      </div>
    </Modal>
  );
}
