export interface Solicitacao {
    id: number;
    status: StatusSolicitacao;
    dataSolicitacao: string;
    dataConclusao?: string;
    idTema: number;
    idProfessor: number;
    idEstutande?: number;
    motivo?: string;
}

export interface SolicitacaoDTO {
    id: number;
    motivo?: string;
}

export type StatusSolicitacao = 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'CANCELADA' | 'CONCLUIDA';

export const statusMap: Record<string, string> = {
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REJEITADA: 'Rejeitada',
  CANCELADA: 'Cancelada',
  CONCLUIDA: 'Concluída',
};