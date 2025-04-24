"use client";

import { useState } from 'react';
import styles from './professor-cadastro.module.scss';
import ButtonAuth from '@/components/ButtonAuth';

export default function UploadProfessores() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

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
        throw new Error(errorData || "Erro ao cadastrar tema");
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
      <div className={styles.container}>
        <div className={styles.card_container}>
          <h2>Cadastrar Professores</h2>
          <p>Arquivo</p>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <p>Apenas arquivos .csv serão aceitos</p>
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : "Cadastrar"} type="submit" onClick={handleUpload} disabled={isLoading} theme="primary" margin="0"/>
        </div>
      </div>
    </div>
  );
}
