import { Curso, CursoProfessor } from '@/types';
import { useState, useEffect } from 'react';

export const useCursos = (usuario: any, formData: any) => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number, label: string }[]>([]);

  const [cursosProfessor, setCursosProfessor] = useState<CursoProfessor[]>([]);
  const [cursosProfessorAtual, setCursosProfessorAtual] = useState<CursoProfessor>({
    id: 0,
    nome: ""
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditar = (index: number) => {
    setCursosProfessorAtual(cursosProfessor[index]);
    setEditIndex(index);
  };
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos`);
        if (!res.ok) throw new Error("Erro ao buscar cursos");

        const data = await res.json();
        const cursosMapeados = data.content.map((curso: any) => ({
          value: curso.id,
          label: curso.nome,
          semestres: curso.semestres,
        }));
        setCursos(cursosMapeados);

        const cursoId = formData.curso;
        const cursoUsuario = cursosMapeados.find((c: { value: number }) => c.value === Number(cursoId));        
        if (cursoUsuario) {
          const semestres = Array.from({ length: cursoUsuario.semestres }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}º Semestre`,
          }));
          setSemestresDisponiveis(semestres);
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };

    if (usuario && usuario.role === "ESTUDANTE") fetchCursos();
  }, [usuario, formData.curso]);

  const handleCursoChange = (cursoId: string) => {
    const id = Number(cursoId);
    const cursoSelecionado = cursos.find(curso => curso.id === id);
    if (cursoSelecionado) {
      const semestres = Array.from({ length: cursoSelecionado.semestres }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}º Semestre`,
      }));
      setSemestresDisponiveis(semestres);
    } else {
      setSemestresDisponiveis([]);
    }
  };

  return {
    setSemestresDisponiveis,
    cursos,
    semestresDisponiveis,
    handleCursoChange,
    cursosProfessor, 
    setCursosProfessor,
    cursosProfessorAtual, 
    setCursosProfessorAtual,
    editIndex,
    handleEditar,
  };
};