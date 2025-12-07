import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import "../styles/telaQuiz.css";

export default function TelaQuiz({ idQuiz, voltar }) {
    const [perguntas, setPerguntas] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [selecionada, setSelecionada] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [respostaCorreta, setRespostaCorreta] = useState("");

    const [tempoRestante, setTempoRestante] = useState(0);
    const intervaloRef = useRef(null);

    useEffect(() => {
        async function carregarQuiz() {

            // 1. Buscar nome do quiz
            const { data: dadosQuiz } = await supabase
                .from("quiz")
                .select("*")
                .eq("id_quiz", idQuiz)
                .single();

            setQuiz(dadosQuiz);

            // 2. Buscar perguntas da edicao
            const { data: perguntasData } = await supabase
                .from("perguntas")
                .select("*, alternativa(info, correta, id_alternativa)")
                .eq("id_qz", idQuiz);

            setPerguntas(perguntasData || []);
        }

        carregarQuiz();
    }, [idQuiz]);

    useEffect(() => {
        if (perguntas.length === 0) return;

        const tempoPergunta = perguntas[indiceAtual].tempo || 30;

        setTempoRestante(tempoPergunta);
        setMostrarResposta(false);
        setRespostaCorreta("");
        setSelecionada("");

        if (intervaloRef.current) clearInterval(intervaloRef.current);

        intervaloRef.current = setInterval(() => {
            setTempoRestante((t) => {
                if (t <= 1) {
                    clearInterval(intervaloRef.current);

                    // TEMPO ACABOU → MOSTRAR RESPOSTA AUTOMÁTICA
                    const pergunta = perguntas[indiceAtual];
                    const correta = pergunta.alternativa.find((alt) => alt.correta);

                    setRespostaCorreta(correta.info);
                    setMostrarResposta(true);

                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(intervaloRef.current);
    }, [perguntas, indiceAtual]);

    if (!quiz || perguntas.length === 0) return <div>Carregando...</div>;

    const pergunta = perguntas[indiceAtual];

    function confirmarResposta() {
        if (!selecionada) {
            alert("Selecione uma alternativa.");
            return;
        }

        if (tempoRestante === 0) return; // impedir confirmar após tempo zerado

        clearInterval(intervaloRef.current);

        const correta = pergunta.alternativa.find((alt) => alt.correta);

        setRespostaCorreta(correta.info);
        setMostrarResposta(true);
    }

    function proximaPergunta() {
        if (indiceAtual < perguntas.length - 1) {
            setIndiceAtual(indiceAtual + 1);
        } else {
            alert("Quiz finalizado!");
        }
    }

    function formatarTempo(segundos) {
        const m = String(Math.floor(segundos / 60)).padStart(2, "0");
        const s = String(segundos % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

    return (
        <div className="container-quiz">

            <div className="header-quiz">
                <div className="timer">
                    Tempo <br />
                    {formatarTempo(tempoRestante)}
                </div>

                <h1 className="titulo-header">UTFPR | Battle Quiz</h1>
            </div>

            <div className="box-quiz">

                <h2 className="titulo-quiz">{quiz.nome_quiz}</h2>

                <div className="pergunta-card">
                    <p><strong>{indiceAtual + 1}. Pergunta:</strong></p>
                    <p className="enunciado-p">{pergunta.enunciado}</p>

                    <div className="opcoes">
                        {pergunta.alternativa?.map((alt) => (
                            <label className="opcao" key={alt.id_alternativa}>
                                <input
                                    type="radio"
                                    name="opcao"
                                    value={alt.id_alternativa}
                                    checked={selecionada === alt.id_alternativa}
                                    onChange={() => setSelecionada(alt.id_alternativa)}
                                    disabled={mostrarResposta || tempoRestante === 0}
                                />
                                {alt.info}
                            </label>
                        ))}
                    </div>

                    {/* Botão confirmar só aparece SE NÃO mostrou resposta e SE ainda tem tempo */}
                    {!mostrarResposta && tempoRestante > 0 && (
                        <button
                            className="btn-confirmar"
                            onClick={confirmarResposta}
                        >
                            Confirmar
                        </button>
                    )}

                    {/* Quando já confirmou ou o tempo acabou */}
                    {mostrarResposta && (
                        <>
                            <p className="resposta-certa">
                                Resposta Correta: {respostaCorreta}
                            </p>

                            <button
                                className="btn-proxima"
                                onClick={proximaPergunta}
                            >
                                Próxima pergunta
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}