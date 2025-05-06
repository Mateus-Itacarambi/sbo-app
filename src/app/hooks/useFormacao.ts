import { useState } from 'react';

export const useFormacao = () => {
  const [curso, setCurso] = useState("");
  const [faculdade, setFaculdade] = useState("");
  const [titulo, setTitulo] = useState("");
  const [anoInicio, setAnoInicio] = useState("");
  const [anoFim, setAnoFim] = useState("");
  
  return {
    curso, 
    setCurso,
    faculdade, 
    setFaculdade,
    titulo,
    setTitulo,
    anoInicio, 
    setAnoInicio,
    anoFim, 
    setAnoFim,
  };
};