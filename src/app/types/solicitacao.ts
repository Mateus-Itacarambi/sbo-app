import { TemaSolicitacao } from "./tema";
import { UsuarioDTO } from "./usuario";

export interface Solicitacao {
    id: number;
    status: StatusSolicitacao;
    dataSolicitacao: string;
    dataConclusaoOrientacao?: string;
    tema: TemaSolicitacao;
    professor: UsuarioDTO;
    estudante: UsuarioDTO;
    motivo?: string;
    tipo: string;
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

export type TipoSolicitacao = 'ORIENTACAO' | 'TEMA';

export const tipoMap: Record<string, string> = {
  ORIENTACAO: 'Orientação',
  TEMA: 'Tema',
};