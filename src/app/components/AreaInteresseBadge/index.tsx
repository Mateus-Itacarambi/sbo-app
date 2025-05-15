import styles from './areaInteresseBadge.module.scss';

interface AreaInteresseBadgeProps {
  nome: string;
  style: string;
  mostrarBotao: boolean;
}

export default function StatusBadge({ nome, style, mostrarBotao }: AreaInteresseBadgeProps) {
    return (
        <span className={`${styles[style]}`}>
          {nome}
          {mostrarBotao && <button>x</button>}
        </span>
    );
  }
