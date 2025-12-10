import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../supabaseClient";
import TelaQuiz from "./TelaQuiz";
import "../styles/telaInicialJog.css";
import RankingJog from "./rankingJog";

export default function TelaInicialJogador({voltarParaLogin}){
    const [abrirModal, setAbrirModal] = useState(false);
    const botaoRef = useRef(null);
    const modalRef = useRef(null);
    const [posicao, setPosicao] = useState({top:0, left:0});

    const [quizSelecionado, setQuizSelecionado] = useState(null);

    const [usuario, setUsuario] = useState({
        nome: "",
        email: ""
    });

    const [resultadoFinal, setResultadoFinal] = useState(null);


    const [quizzes, setQuizzes] = useState([]);

    async function carregarQuizzes() {
        // 1. Buscar quizzes
        const { data: quizzes, error: erroQuiz } = await supabase
            .from("quiz")
            .select("id_quiz, nome_quiz");

        if (erroQuiz) {
            console.error("Erro ao buscar quizzes:", erroQuiz);
            return [];
        }

        // 2. Buscar perguntas
        const { data: perguntas, error: erroPerguntas } = await supabase
            .from("perguntas")
            .select("id_qz");

        if (erroPerguntas) {
            console.error("Erro ao buscar perguntas:", erroPerguntas);
            return [];
        }

        // 3. Contar perguntas por quiz
        const contagem = {};
        perguntas.forEach((p) => {
            if (!contagem[p.id_qz]) contagem[p.id_qz] = 0;
            contagem[p.id_qz]++;
        });

        // 4. Retornar quizzes com totalPerguntas
        return quizzes.map((q) => ({
            id: q.id_quiz,
            nome: q.nome_quiz,
            totalPerguntas: contagem[q.id_quiz] || 0,
        }));
    }

    // Carregar quizzes ao abrir tela
    useEffect(() => {
        async function carregar() {
            const resultado = await carregarQuizzes();
            setQuizzes(resultado);
        }
        carregar();
    }, []);

    useEffect(() => {
        async function carregarUsuario() {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data } = await supabase
                    .from("pessoa")
                    .select("nome, email")
                    .eq("id", user.id)
                    .single();

                if (data) {
                    setUsuario({
                        nome: data.nome,
                        email: data.email
                    });
                }
            }
        }

        carregarUsuario();
    }, []);


    //calcula para abrir o modal
    useEffect(() => {
        if (abrirModal && botaoRef.current && modalRef.current) {
            const rectBotao = botaoRef.current.getBoundingClientRect();
            const rectModal = modalRef.current.getBoundingClientRect();
      setPosicao({
        top: rectBotao.bottom + window.scrollY + 6, // um espacinho
        // centraliza o modal: centro do botão - metade da largura do modal
        left:
          rectBotao.left +
          rectBotao.width / 2 +
          window.scrollX -
          rectModal.width / 2,
      });
    }
     }, [abrirModal]);

     //para fechar o modal
     useEffect(() => {
        const fechar = (e) => {
            if (
              !botaoRef.current?.contains(e.target) &&
              !modalRef.current?.contains(e.target)
            ) {
              setAbrirModal(false);
            }
          };
        if (abrirModal) document.addEventListener("click", fechar);
        return () => document.removeEventListener("click", fechar);

       
    }, [abrirModal]);

    if (resultadoFinal) {
    return (
        <RankingJog
            resultado={resultadoFinal}
            voltar={() => {
                setResultadoFinal(null);
                setQuizSelecionado(null);
            }}
        />
    );
}

// Se escolheu um quiz -> vai para TelaQuiz
if (quizSelecionado) {
    return (
        <TelaQuiz
            idQuiz={quizSelecionado}
            voltar={() => setQuizSelecionado(null)}
            finalizarQuiz={(dados) => setResultadoFinal(dados)}
        />
    );
}

    return(
        <div className="container-telaij">
            <div className="header-tij">
                <div className="space-ti"></div>
                <h1 className="title">UTFPR | Battle Quiz</h1>
                <div className="perfil-btn">
                    <button className="icon" ref={botaoRef} onClick={() => setAbrirModal(!abrirModal)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"className="lucide lucide-circle-user-round-icon lucide-circle-user-round" color= "var(--roxo3)"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg></button>

                     {/* Modal */}
                    {abrirModal && (
                        <div 
                        ref={modalRef}
                        className="modal-tij"
                            style={{ top: posicao.top, left: posicao.left }}>
                            <div className="conteudo-modal">
                                <div className="nome">{usuario.nome}</div>
                                <div className="email">{usuario.email}</div>
                                <span className="logout" onClick={voltarParaLogin}>Encerrar sessão</span>
                            </div>
                           
                        </div>
                    )}
                </div>
            </div>

            <div className="box-jog">Edições
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card-tio-jog" onClick={() => setQuizSelecionado(quiz.id)}>
                        <div className="quiz-tema">{quiz.nome}</div>
                        <div className="quiz-info">{quiz.totalPerguntas} perguntas</div>
                    </div>
                ))}
            </div>
        </div>
    );
}