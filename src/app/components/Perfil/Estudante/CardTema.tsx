import styles from "../perfil.module.scss";
import { Estudante, Professor, UsuarioCompleto } from "@/types";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Icone from "@/assets/tres-pontos.png";
import StatusBadge from "@/components/StatusBadge";
import ButtonAuth from "@/components/ButtonAuth";

type StatusTipo = 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO';

interface CardTemaProps {
  usuario: UsuarioCompleto;
  onEditar: () => void;
  onRemover: () => void;
  onAdicionarEstudante: () => void;
  onRemoverEstudante: () => void;
  onCancelarOrientação: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
}

export default function CardTema({ usuario, onEditar, onRemover, onAdicionarEstudante, onRemoverEstudante, onCancelarOrientação, onAdicionarTema, mostrarBotoes }: CardTemaProps) {
  return (
    <div className={styles.card_tema}>
      <h2>Tema</h2>
      {(usuario as Estudante).tema ? (
        <div className={styles.tema}>
          <div className={styles.tema_content}>
            <div className={styles.title}>
              {(usuario as Estudante).tema?.titulo}
                {mostrarBotoes && (
                  <Dropdown
                    label=""
                    width="17rem"
                    top="2rem"
                    icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
                    items={[
                      { type: "link", label: "", href: "" },
                      { type: "action", label: "Editar", onClick: onEditar },
                      { type: "action", label: "Remover", onClick: onRemover },
                      { type: "action", label: "Adicionar Estudante", onClick: onAdicionarEstudante },
                      { type: "action", label: "Remover Estudante", onClick: onRemoverEstudante },
                      { type: "action", label: "Cancelar Orientação", onClick: onCancelarOrientação },
                    ]}
                  />
                )}
            </div>
            {(usuario as Estudante).tema?.statusTema && (
                <StatusBadge status={(usuario as Estudante).tema?.statusTema as StatusTipo} />
            )}
            <div className={styles.keywords}>{(usuario as Estudante).tema?.palavrasChave}</div>
            <div className={styles.description}>
              {(usuario as Estudante).tema?.estudantes
                ?.map(e => e.nome)
                .sort((a, b) => a.localeCompare(b))
                .join(', ') || 'Nenhum estudante'}
            </div>
            <div className={styles.description}>{(usuario as Estudante).tema?.descricao}</div>
          </div>
        </div>

      ) : (
        <>
          <p>Não possui um tema cadastrado.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Tema" type="button" theme="primary" onClick={onAdicionarTema} />
          )}
        </>
      )}
    </div>
  );
}
