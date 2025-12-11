import React from "react";
import "../styles/rankingOrg.css";

export default function RankingOrg({ quizzes }) {
  const items = Array.isArray(quizzes) ? quizzes : [];

  const maxValue = items.reduce(
    (max, q) => Math.max(max, Number(q.totalRespostas || 0)),
    0
  );

  const lines = 10;
  const step = Math.ceil((maxValue || 1) / lines) || 1;
  const maxScale = step * lines;
  const maxBarHeight = 260; // deve coincidir com .ranking-chart-wrapper-org height

  const valueToPx = (v) => {
    if (!maxScale) return 0;
    return Math.round((v / maxScale) * maxBarHeight);
  };

  if (!items.length) {
    return (
      <div className="ranking-container-org">
        <h2 className="ranking-title-org">Quantidade de respostas</h2>
        <div className="ranking-empty-org">Nenhum quiz encontrado.</div>
      </div>
    );
  }

  return (
    <div className="ranking-container-org">
      <h2 className="ranking-title-org">Quantidade de respostas</h2>

      <div className="ranking-chart-wrapper-org">
        <div className="y-axis-org">
          {Array.from({ length: lines + 1 }).map((_, i) => {
            const val = step * (lines - i);
            return (
              <div key={i} className="y-line-org">
                <span className="y-label-org">{val}</span>
                <div className="y-grid-org" />
              </div>
            );
          })}
        </div>

        <div className="bars-area-org">
          <div className="bars-org">
            {items.map((quiz) => {
              const value = Number(quiz.totalRespostas || 0);
              const height = valueToPx(value);
              return (
                <div key={quiz.id} className="bar-item-org">
                  {/* wrapper com altura 100% — controla o tamanho visual da barra */}
                  <div className="bar-wrap-org" style={{ height: `${maxBarHeight}px` }}>
                    <div
                      className="bar-org"
                      title={`${quiz.nome} — ${value}`}
                      style={{ height: `${height}px` }}
                    />
                  </div>

                  {/* rótulos ficam FORA do fluxo de altura da barra */}
                  <div className="bar-labels-org">
                    <span className="bar-name-org">{quiz.nome}</span>
                    <span className="bar-value-org">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}