import React from "react";
import "../styles/rankingJog.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function rankingJog({ resultado, voltar }) {

    const { acertos, erros, pontuacao, total, nomeQuiz } = resultado;

    const data = {
        labels: ["Acertos", "Erros"],
        datasets: [
            {
                data: [acertos, erros],
                backgroundColor: ["#e7b5ff", "#3a015c"],
                borderColor: ["#e7b5ff", "#3a015c"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="ranking-container">

            <h1 className="ranking-title">UTFPR | Battle Quiz</h1>

            <div className="ranking-card">
                
                <h2 className="quiz-name">{nomeQuiz}</h2>

                <div className="graph-section">
                    
                    <div className="graph">
                        <Pie data={data} />
                    </div>

                    <div className="pontuacao-box">
                        <p className="pontuacao-titulo">Pontuação:</p>
                        <p className="pontuacao-valor">
                            {pontuacao}/{total * 2}
                        </p>
                    </div>
                </div>

                <button className="btn-voltar" onClick={voltar}>
                    Voltar ao início
                </button>

            </div>

        </div>
    );
}