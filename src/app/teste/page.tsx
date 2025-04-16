import React from 'react';
import './TccCards.scss';

const tccThemes = [
  {
    title: 'Sistema Inteligente de Monitoramento Ambiental',
    keywords: ['IoT', 'Sensores', 'Meio Ambiente'],
    status: 'Aprovado',
    description: 'Desenvolvimento de um sistema baseado em sensores IoT para monitoramento de variáveis ambientais em tempo real.'
  },
  {
    title: 'Plataforma de Reforço Escolar com IA',
    keywords: ['Educação', 'Inteligência Artificial', 'Chatbots'],
    status: 'Em Análise',
    description: 'Uma solução educacional personalizada utilizando inteligência artificial para auxiliar alunos com dificuldades.'
  },
  {
    title: 'Aplicativo de Controle Financeiro Pessoal',
    keywords: ['Mobile', 'Finanças', 'Flutter'],
    status: 'Recusado',
    description: 'Aplicativo multiplataforma para auxiliar usuários no controle de seus gastos diários e orçamento mensal.'
  }
];

export default function TccCards() {
  return (
    <div className="card-container">
      <h2>Design 1 – Divisão lateral</h2>
      {tccThemes.map((theme, index) => (
        <div key={index} className="card card-1">
          <div className="status-bar"></div>
          <div className="card-content">
            <div className="title">{theme.title}</div>
            <div className="status">{theme.status}</div>
            <div className="keywords">{theme.keywords.join(', ')}</div>
            <div className="description">{theme.description}</div>
          </div>
        </div>
      ))}

      <h2>Design 2 – Colunas</h2>
      {tccThemes.map((theme, index) => (
        <div key={index} className="card card-2">
          <div className="left">
            <div className="title">{theme.title}</div>
            <div className="status">{theme.status}</div>
          </div>
          <div className="right">
            <div className="keywords">{theme.keywords.join(', ')}</div>
            <div className="description">{theme.description}</div>
          </div>
        </div>
      ))}

      <h2>Design 3 – Badge e chips</h2>
      {tccThemes.map((theme, index) => (
        <div key={index} className="card card-3">
          <div className="status-badge">{theme.status}</div>
          <div className="title">{theme.title}</div>
          <div className="keywords">
            {theme.keywords.map((kw, i) => (
              <span key={i}>{kw}</span>
            ))}
          </div>
          <div className="description">{theme.description}</div>
        </div>
      ))}
    </div>
  );
}
