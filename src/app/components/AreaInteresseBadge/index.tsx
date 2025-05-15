import { AreaInteresse } from '@/types';
import styles from './areaInteresseBadge.module.scss';

interface AreaInteresseBadgeProps {
  areaInteresse: AreaInteresse;
  style: string;
  mostrarBotao: boolean;
  onRemover: (areaInteresseId: number) => void;
}

export default function StatusBadge({ areaInteresse, style, mostrarBotao, onRemover }: AreaInteresseBadgeProps) {
    return (
        <span className={`${styles[style]}`}>
          {areaInteresse.nome}
          {mostrarBotao && <button onClick={() => onRemover(areaInteresse.id)}>x</button>}
        </span>
    );
  }
