import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import "../styles/telaQuiz.css";

function shuffleArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function TelaQuiz({ idQuiz, voltar, finalizarQuiz }) {
    const [perguntas, setPerguntas] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [selecionada, setSelecionada] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [respostaCorreta, setRespostaCorreta] = useState("");

    const [tempoRestante, setTempoRestante] = useState(0);
    const intervaloRef = useRef(null);

    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [pontuacaoTotal, setPontuacaoTotal] = useState(0);

    useEffect(() => {
    async function carregarQuiz() {
      // Buscar quiz
      const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .select("*")
        .eq("id_quiz", idQuiz)
        .single();

      if (quizError) {
        console.error(quizError);
        return;
      }

      setQuiz(quizData);

      // Buscar perguntas + alternativas
      const { data: perguntasData, error: perguntasError } = await supabase
        .from("perguntas")
        .select("*, alternativa(id_alternativa, info, correta)")
        .eq("id_qz", idQuiz);

      if (perguntasError) {
        console.error(perguntasError);
        return;
      }

      // Embaralhar perguntas
      let perguntasEmbaralhadas = shuffleArray(perguntasData || []);

      // Limitar pela quantidade definida no quiz
      perguntasEmbaralhadas = perguntasEmbaralhadas.slice(
        0,
        quizData.qtd_perguntas
      );

      // Embaralhar alternativas de cada pergunta
      perguntasEmbaralhadas = perguntasEmbaralhadas.map((p) => ({
        ...p,
        alternativa: shuffleArray(p.alternativa || []),
      }));

      setPerguntas(perguntasEmbaralhadas);
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

                    setErros((e) => e + 1);

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

        if (selecionada === correta.id_alternativa) {
            setAcertos((a) => a + 1);
            setPontuacaoTotal((p) => p + pergunta.pontuacao);
        } else {
            setErros((e) => e + 1);
        }
    }

    async function incrementarTotalRespostas() {
        console.log("ID do quiz enviado:", idQuiz);

        const { data, error } = await supabase.rpc(
            "incrementar_respostas_quiz",
            {
            quiz_id: idQuiz,
            }
        );

        console.log("RPC retorno data:", data);
        console.log("RPC retorno error:", error);

        if (error) {
            console.error("Erro ao incrementar respostas:", error);
        }
    }

    function proximaPergunta() {
        if (indiceAtual < perguntas.length - 1) {
            setIndiceAtual(indiceAtual + 1);
        } else {
            clearInterval(intervaloRef.current);

            incrementarTotalRespostas();

            finalizarQuiz({
                acertos,
                erros,
                total: perguntas.length,
                nomeQuiz: quiz.nome_quiz
            });
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
                                Próxima página
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}