import { useState, useEffect } from 'react';

export const useCursos = (usuario: any, formData: any) => {
  const [cursos, setCursos] = useState<any[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number, label: string }[]>([]);
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch("http://localhost:8080/cursos");
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
    // Atualize o formData conforme necessário
    const cursoSelecionado = cursos.find(curso => curso.value === id);
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
    cursos,
    semestresDisponiveis,
    handleCursoChange
  };
};