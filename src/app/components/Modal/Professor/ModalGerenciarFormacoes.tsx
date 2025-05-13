import { Formacao, FormacaoDTO } from "@/types";
import ReactDOM from "react-dom";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useFormacoes } from "@/hooks/useFormacoes";
import { useEffect, useState } from "react";
import styles from "./modalGerenciarFormacoes.module.scss";
import { useModal } from "@/hooks/useModal";
import ModalConfirmar from "../ModalConfirmar";

interface ModalGerenciarFormacoesProps {
  onClose: () => void;
  onAtualizar: (formacaoId: number, formacoes: FormacaoDTO) => void;
  onRemoverFormacao: () => void;
  onRemove: (formacaoId: number) => void;
  formacoesIniciais: Formacao[];
  isLoading: boolean;
}

export default function ModalGerenciarFormacoes({ onClose, onAtualizar, onRemove, onRemoverFormacao, formacoesIniciais, isLoading }: ModalGerenciarFormacoesProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);
  
  const [modalConfirmarRemocaoFormacao, setModalConfirmarRemocaoFormacao] = useState(false);

  const {
    formacoes,
    setFormacoes,
    formacaoAtual,
    setFormacaoAtual,
    handleEditar,
  } = useFormacoes();

  useEffect(() => {
    setFormacoes(formacoesIniciais);
  }, [formacoesIniciais]);

  const handleChange = (campo: keyof Formacao, valor: string) => {
    setFormacaoAtual({ ...formacaoAtual, [campo]: campo.includes("ano") ? Number(valor) : valor });
  };

  const handleCliqueFormacao = (formacao: Formacao) => {
    const indexOriginal = formacoes.findIndex((f) => f === formacao);
    if (indexOriginal !== -1) {
      handleEditar(indexOriginal);
      setIndiceSelecionado(indexOriginal);
    }
  };

  const handleSubmit = () => {
    if (formacaoAtual.id === undefined) {
      console.error("ID da formação não definido.");
      return;
    }

    const formacao: FormacaoDTO = {
      curso: formacaoAtual.curso,
      instituicao: formacaoAtual.instituicao,
      titulo: formacaoAtual.titulo,
      anoInicio: Number(formacaoAtual.anoInicio),
      anoFim: Number(formacaoAtual.anoFim),
    };

    onAtualizar(formacaoAtual.id, formacao);

    setFormacoes((prev) =>
      prev.map((f) =>
        f.id === formacaoAtual.id ? { ...f, ...formacao } : f
      )
    );
  };

  const handleRemove = () => {
    if (formacaoAtual.id === undefined) {
      console.error("ID da formação não definido.");
      return;
    }

    onRemove(formacaoAtual.id);

    setFormacoes((prev) => prev.filter((f) => f.id !== formacaoAtual.id));

    setFormacaoAtual({
      id: 0,
      curso: "",
      instituicao: "",
      titulo: "",
      anoInicio: new Date().getFullYear(),
      anoFim: new Date().getFullYear(),
    });

    setModalConfirmarRemocaoFormacao(false)
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal_form} onClick={(e) => e.stopPropagation()}>
        <h2>Gerenciar Formações</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputAuth label="Curso" type="text" value={formacaoAtual.curso} onChange={(e) => handleChange("curso", e.target.value)} />
          <InputAuth label="Instituição" type="text" value={formacaoAtual.instituicao} onChange={(e) => handleChange("instituicao", e.target.value)} />
          <InputAuth label="Título do TCC" type="text" value={formacaoAtual.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />

          <div className={styles.flex}>
            <InputAuth label="Ano de Início" type="number" value={formacaoAtual.anoInicio.toString()} onChange={(e) => handleChange("anoInicio", e.target.value)} />
            <InputAuth label="Ano de Conclusão" type="number" value={formacaoAtual.anoFim.toString()} onChange={(e) => handleChange("anoFim", e.target.value)} />

            <ButtonAuth type="submit" text={isLoading ? <span className="spinner"></span> : "Remover Formação"} theme="secondary" margin="0" disabled={isLoading} onClick={() => setModalConfirmarRemocaoFormacao(true)} />
            <ButtonAuth type="submit" text={isLoading ? <span className="spinner"></span> : "Atualizar Formação"} theme="primary" margin="0" disabled={isLoading} onClick={handleSubmit} />
          </div>
        </form>
      </div>

      <div className={styles.modal_lista} onClick={(e) => e.stopPropagation()}>
        <h2>Selecione uma formação</h2>
        <ul>
          {formacoes
            ?.slice()
            .sort((a, b) => a.anoInicio - b.anoInicio)
            .map((f) => (
              <li
                key={f.id || `${f.curso}-${f.anoInicio}`}
                onClick={() => handleCliqueFormacao(f)}
                className={indiceSelecionado === formacoes.indexOf(f) ? styles.selecionado : ""}
              >
                <div className={styles.formacao}>
                  <strong>{f.curso}</strong> – {f.instituicao} – {f.titulo} ({f.anoInicio}–{f.anoFim})
                </div>
              </li>
            ))}
        </ul>

        <ButtonAuth type="button" text="Fechar" theme="secondary" onClick={onClose} margin="0" />
      </div>
      
      {modalConfirmarRemocaoFormacao && (
        <ModalConfirmar 
          titulo="Remover Formação"
          descricao="Tem certeza que deseja remover esta formação?"
          onClose={() => setModalConfirmarRemocaoFormacao(false)}
          handleRemover={handleRemove}
          isLoading={isLoading}
        />
      )}
    </div>,
    document.body
  );
}
