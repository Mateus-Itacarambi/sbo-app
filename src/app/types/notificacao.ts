import { SolicitacaoDTO } from "./solicitacao";

export interface UsuarioSimplesDTO {
    id: number;
    nome: string;
    role: string;
    slug: string;
}

export interface NotificacaoDTO {
    id: number;
    mensagem: string;
    lida: boolean;
    dataCriacao: string;
    tipo: string;
    solicitacao?: SolicitacaoDTO;
    solicitante?: UsuarioSimplesDTO;
    destinatario: UsuarioSimplesDTO;
}