import styles from './paginacao.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }: Props) {
  return (
    <div className={styles.paginacao}>
      <button
        className={styles.prev}
        disabled={paginaAtual === 0 || totalPaginas === 0}
        onClick={() => onPaginaChange(paginaAtual - 1)}
      >
        <ChevronLeft size={20} strokeWidth={"2.6px"} />
        Anterior
      </button>

      <span>
        {totalPaginas === 0 ? "0 de 0" : `${paginaAtual + 1} de ${totalPaginas}`}
      </span>

      <button
        className={styles.next}
        disabled={paginaAtual + 1 === totalPaginas || totalPaginas === 0}
        onClick={() => onPaginaChange(paginaAtual + 1)}
      >
        Próximo
        <ChevronRight size={20} strokeWidth={"2.6px"} />
      </button>
    </div>
  );
}
