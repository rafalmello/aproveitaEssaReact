import React, { useState, useEffect } from 'react';
import ProgressBar from './progressBar';

export function TelaModuloAluno() {
  const [topicosFeitos, setTopicosFeitos] = useState(0);
  const [quantTopicos, setQuantTopicos] = useState(10); // Supondo 10 tópicos como exemplo
  const [porcentagemFeita, setPorcentagemFeita] = useState(0);

  useEffect(() => {
    if (quantTopicos > 0) {
      setPorcentagemFeita((topicosFeitos / quantTopicos) * 100);
    }
  }, [topicosFeitos, quantTopicos]);

  let fazerAtividade = () => {
    setTopicosFeitos(prev => prev + 1);
    // Quando ele aperta no botão, acrescenta um tópico feito
  }

  return (
    <>
      <div className="topicosConcluidos">
        <label>% Tópicos Feitos concluído</label>
        <h1>Barra de Progresso</h1>
        <ProgressBar completed={porcentagemFeita} />
        <button className="btnFazerAtividade" type="button" onClick={fazerAtividade}>
          Fazer atividade do módulo
        </button>
      </div>
    </>
  );
}
