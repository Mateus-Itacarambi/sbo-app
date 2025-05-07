import { useState } from "react";
import { Formacao } from "@/types";

export function useFormacoes() {
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [formacaoAtual, setFormacaoAtual] = useState<Formacao>({
    id: 0,
    curso: "",
    instituicao: "",
    titulo: "",
    anoInicio: new Date().getFullYear(),
    anoFim: new Date().getFullYear()
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // const resetFormacao = () => {
  //   setFormacaoAtual({
  //     curso: "",
  //     instituicao: "",
  //     titulo: "",
  //     anoInicio: new Date().getFullYear(),
  //     anoFim: new Date().getFullYear()
  //   });
  //   setEditIndex(null);
  // };

  // const handleAddOrUpdate = () => {
  //   if (editIndex !== null) {
  //     const novas = [...formacoes];
  //     novas[editIndex] = formacaoAtual;
  //     setFormacoes(novas);
  //   } else {
  //     setFormacoes([...formacoes, formacaoAtual]);
  //   }
  //   resetFormacao();
  // };

  const handleEditar = (index: number) => {
    setFormacaoAtual(formacoes[index]);
    setEditIndex(index);
  };

  // const handleRemove = (index: number) => {
  //   setFormacoes(formacoes.filter((_, i) => i !== index));
  //   if (editIndex === index) resetFormacao();
  // };

  return {
    formacoes,
    setFormacoes,
    formacaoAtual,
    setFormacaoAtual,
    editIndex,
    // handleAddOrUpdate,
    handleEditar,
    // handleRemove,
    // resetFormacao
  };
}
