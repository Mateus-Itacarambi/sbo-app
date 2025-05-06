import { Formacao, Professor } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../InputAuth";
import Modal from "./Modal";
import { useFormacao } from "@/hooks/useFormacao";
import { useEffect } from "react";

interface ModalFormacaoProps {
  usuario: any;
  formacaoSelecionada?: Formacao;
  onClose: () => void;
  atualizarFormacao: (e: React.FormEvent, formacao: Formacao) => void;
  cadastrarFormacao: (e: React.FormEvent, formacao: Formacao) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalFormacao({
  usuario,
  formacaoSelecionada,
  onClose,
  atualizarFormacao,
  cadastrarFormacao,
  onCancelar,
  isLoading,
}: ModalFormacaoProps) {
  const {
    curso, setCurso,
    faculdade, setFaculdade,
    titulo, setTitulo,
    anoInicio, setAnoInicio,
    anoFim, setAnoFim
  } = useFormacao();

  useEffect(() => {
    if (formacaoSelecionada) {
      setCurso(formacaoSelecionada.curso || "");
      setFaculdade(formacaoSelecionada.faculdade || "");
      setTitulo(formacaoSelecionada.titulo || "");
      setAnoInicio(String(formacaoSelecionada.anoInicio || ""));
      setAnoFim(String(formacaoSelecionada.anoFim || ""));
    } else {
      setCurso("");
      setFaculdade("");
      setTitulo("");
      setAnoInicio("");
      setAnoFim("");
    }
  }, [formacaoSelecionada]);

  const handleSubmit = (e: React.FormEvent) => {
    const novaFormacao: Formacao = {
      curso,
      faculdade,
      titulo,
      anoInicio: Number(anoInicio),
      anoFim: Number(anoFim)
    };

    if (formacaoSelecionada) {
      atualizarFormacao(e, novaFormacao);
    } else {
      cadastrarFormacao(e, novaFormacao);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>{formacaoSelecionada ? "Editar Formação" : "Cadastrar Formação"}</h2>
      <form onSubmit={handleSubmit}>
        <InputAuth label="Curso" type="text" value={curso} onChange={(e) => setCurso(e.target.value)} />
        <InputAuth label="Faculdade" type="text" value={faculdade} onChange={(e) => setFaculdade(e.target.value)} />
        <InputAuth label="Título" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <InputAuth label="Ano de Início" type="number" value={anoInicio} onChange={(e) => setAnoInicio(e.target.value)} />
        <InputAuth label="Ano de Conclusão" type="number" value={anoFim} onChange={(e) => setAnoFim(e.target.value)} />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} />
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : "Salvar"} type="submit" theme="primary" />
        </div>
      </form>
    </Modal>
  );
}
