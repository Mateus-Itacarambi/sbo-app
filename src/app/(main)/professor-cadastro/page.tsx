"use client";

import { useState } from 'react';
import styles from './professor-cadastro.module.scss';
import ButtonAuth from '@/components/ButtonAuth';
import Alerta from '@/components/Alerta';
import { useAlertaTemporario } from '@/hooks/useAlertaTemporario';

export default function UploadProfessores() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  useAlertaTemporario({ erro, sucesso, setErro, setSucesso, setMostrarAlerta });

  const handleUpload = async () => {
    setIsLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/professores/importar-professores", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao cadastrar professores");
      }
  
      setSucesso("Professores cadastrados com sucesso!");
      setErro("");
    } catch (error: any) {
      console.error("Erro ao cadastrar professores:", error);

      if (error.message.includes("Failed to fetch")) {
        setErro("Erro ao conectar ao servidor.");
      } else {
        setErro(error.message || "Erro desconhecido.");
      }

      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
          <h2>Cadastrar Professores</h2>
          <p>Arquivo</p>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <p>Apenas arquivos .csv serão aceitos</p>
          <h3>Exemplo de arquivo .csv</h3>
          <div className={styles.exemplo}>
            <p>NOME</p>
            <p>EMAIL</p>
            <p>Luiz Márcio Severino Dias</p>
            <p>luiz.dias@ifb.edu.br</p>
          </div>
          <div className={styles.obs}><strong>Observação: </strong>os valores contidos no arquivo .csv devem estar separados por vírgula.</div>
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : "Cadastrar"} type="button" onClick={handleUpload} disabled={isLoading || !file} theme="primary" margin="2rem 0 0 0"/>
        </div>
      </div>
    </div>
  );
}
