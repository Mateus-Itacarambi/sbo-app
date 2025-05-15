"use client";

import { useEffect, useState } from "react";
import styles from "./modalAreaInteresse.module.scss";
import BadgeAreaInteresse from "./BadgeAreaInteresse";

interface ModalProps {
  todasAreas: string[];
  areasSelecionadas: string[];
  onCancelar: () => void;
  onAdicionar: (selecionadas: string[]) => void;
}

export default function ModalAreaInteresse({ todasAreas, areasSelecionadas, onCancelar, onAdicionar }: ModalProps) {
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    setSelecionadas(areasSelecionadas);
  }, [areasSelecionadas]);

  const filtrarAreas = todasAreas.filter(area =>
    area.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleSelecao = (area: string) => {
    setSelecionadas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  return (
    <div className={styles.modal}>
      <input
        type="text"
        placeholder="Área de Interesse"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className={styles.inputBusca}
      />

      <div className={styles.listaBadges}>
        {filtrarAreas.map((area, i) => (
          <BadgeAreaInteresse
            key={i}
            texto={area}
            ativo={selecionadas.includes(area)}
            onClick={() => toggleSelecao(area)}
          />
        ))}
      </div>

      <div className={styles.botoes}>
        <button onClick={onCancelar} className={styles.btnCancelar}>Cancelar</button>
        <button onClick={() => onAdicionar(selecionadas)} className={styles.btnAdicionar}>Adicionar</button>
      </div>
    </div>
  );
}
