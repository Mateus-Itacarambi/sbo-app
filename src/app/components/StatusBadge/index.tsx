import styles from './statusBadge.module.scss';

interface StatusBadgeProps {
  status: 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO';
}

const statusMap: Record<string, string> = {
  RESERVADO: 'Reservado',
  EM_ANDAMENTO: 'Em andamento',
  DISPONIVEL: 'Disponível',
  INDISPONIVEL: 'Indisponível',
  CONCLUIDO: 'Concluído',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[status]}`}>
        {statusMap[status]}
        </span>
    );
  }
