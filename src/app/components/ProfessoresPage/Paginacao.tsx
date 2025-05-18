interface Props {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }: Props) {
  return (
    <div className="paginacao">
      <button disabled={paginaAtual === 0} onClick={() => onPaginaChange(paginaAtual - 1)}>Anterior</button>
      <span>Página {paginaAtual + 1} de {totalPaginas}</span>
      <button disabled={paginaAtual + 1 === totalPaginas} onClick={() => onPaginaChange(paginaAtual + 1)}>Próxima</button>
    </div>
  );
}
