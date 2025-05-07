import { Formacao } from "@/types";
import Modal from "./Modal";
import InputAuth from "../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useFormacoes } from "@/hooks/useFormacoes";
import { useEffect } from "react";
import styles from "./modal.module.scss";

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
    // handleAddOrUpdate,
    handleEditar,
    // handleRemove,
    // resetFormacao,
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

      <ul style={{ marginTop: "1rem" }}>
        {formacoes.map((f, idx) => (
          <li key={idx} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
            <strong>{f.curso}</strong> – {f.instituicao} ({f.anoInicio}–{f.anoFim})
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              <button onClick={() => handleEditar(idx)}>Editar</button>
              <button onClick={() => onClose()}>Remover</button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <InputAuth label="Curso" type="text" value={formacaoAtual.curso} onChange={(e) => handleChange("curso", e.target.value)} />
        <InputAuth label="Instituição" type="text" value={formacaoAtual.instituicao} onChange={(e) => handleChange("instituicao", e.target.value)} />
        <InputAuth label="Título" type="text" value={formacaoAtual.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />

        <div className={styles.flex}>
          <InputAuth label="Ano de Início" type="number" value={formacaoAtual.anoInicio.toString()} onChange={(e) => handleChange("anoInicio", e.target.value)} />
          <InputAuth label="Ano de Conclusão" type="number" value={formacaoAtual.anoFim.toString()} onChange={(e) => handleChange("anoFim", e.target.value)} />

          <ButtonAuth type="button" text="Cancelar" theme="secondary" onClick={onClose} margin="0" />
          <ButtonAuth type="submit" text={"Atualizar Formação"} theme="primary" margin="0" />
        </div>
      </form>
    </Modal>
  );
}
