
import React, { useEffect, useState } from "react";
import "../styles/criarquizzes.css";
import { supabase } from "../supabaseClient";

    function SimpleModal({ children, fechar }) {
        return (
            <div className="modal-overlay" onClick={fechar}>
                <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={fechar}>X</button>
                    {children}
                </div>
            </div>);}
            
    export default function AbaCriarQuizz({voltarTelaIniOrg}){
        // Tema do quiz (fixo)
        const [tema, setTema] = useState("");

        // Lista de perguntas
         const [perguntas, setPerguntas] = useState(() => {
            try {
                const raw = localStorage.getItem("quiz_perguntas_v1");
                return raw ? JSON.parse(raw) : [
                    { texto: "", respostas: ["", "", "", ""], correta: null, tempo: 20, pontos: 5 }];
            } catch {
                return [{ texto: "", respostas: ["", "", "", ""], correta: null, tempo: 20, pontos: 5 }];}
            });

        // Índice da pergunta atual
        const [indexAtual, setIndexAtual] = useState(() => {
            const i = Number(localStorage.getItem("quiz_index_v1") || 0);
            return isNaN(i) ? 0 : i;});
            
        const [abrirPainel, setAbrirPainel] = useState(false);
        const perguntaAtual = perguntas[indexAtual];

       // persistir perguntas e index
        useEffect(() => {
            localStorage.setItem("quiz_perguntas_v1", JSON.stringify(perguntas));
        }, [perguntas]);

        useEffect(() => {
            localStorage.setItem("quiz_index_v1", String(indexAtual));
        }, [indexAtual]);

        // segurança: garante que indexAtual esteja dentro do range
        useEffect(() => {
            if (indexAtual < 0) setIndexAtual(0);
            if (indexAtual > perguntas.length - 1) setIndexAtual(Math.max(0, perguntas.length - 1));
        }, [indexAtual, perguntas.length]);

        // helpers de atualização imutável
        function setPerguntasCopia(fn) {
            setPerguntas((prev) => {
            const copia = JSON.parse(JSON.stringify(prev));
            fn(copia);
            return copia;
            });
        }

        function atualizarTextoPergunta(valor) {
            setPerguntasCopia((copia) => {
            copia[indexAtual].texto = valor;
            });
        }

        function atualizarResposta(i, valor) {
            setPerguntasCopia((copia) => {
            copia[indexAtual].respostas[i] = valor;
            });
        }

        function selecionarCorreta(i) {
            setPerguntasCopia((copia) => {
            copia[indexAtual].correta = i;
            });
        }

        function atualizarCampoModal(campo, valor) {
            setPerguntasCopia((copia) => {
            copia[indexAtual][campo] = valor;
            });
        }

        function adicionarPergunta() {
            setPerguntas((prev) => [
            ...prev,
            { texto: "", respostas: ["", "", "", ""], correta: null, tempo: 20, pontos: 5 },
            ]);
            setIndexAtual(perguntas.length); // vai pra nova pergunta
            setAbrirPainel(false);
        }

        function removerPergunta(idx) {
            if (perguntas.length === 1) {
            // limpar a única pergunta
            setPerguntas([{ texto: "", respostas: ["", "", "", ""], correta: null, tempo: 20, pontos: 5 }]);
            setIndexAtual(0);
            return;
            }
            setPerguntas((prev) => {
            const nova = prev.filter((_, i) => i !== idx);
            return nova;
            });
            // ajusta index se necessário
            setIndexAtual((old) => Math.max(0, Math.min(old, perguntas.length - 2)));
        }

        function proximo() {
            setIndexAtual((old) => Math.min(perguntas.length - 1, old + 1));
        }

        function anterior() {
            setIndexAtual((old) => Math.max(0, old - 1));
        }

        async function finalizarQuiz() {
            try {
            // Validações básicas
                if (!tema.trim()) {
                    alert("Informe o tema do quiz.");
                    return;
                }

                if (!perguntas.length) {
                    alert("Adicione pelo menos uma pergunta.");
                    return;
                }

                // valida cada pergunta
                for (let pIndex = 0; pIndex < perguntas.length; pIndex++) {
                    const p = perguntas[pIndex];
                    if (!p.texto || !p.texto.trim()) {
                    alert(`Preencha o enunciado da pergunta ${pIndex + 1}.`);
                    return;
                    }
                    // pelo menos 2 respostas não vazias
                    const filled = p.respostas.filter((r) => r && r.trim()).length;
                    if (filled < 2) {
                    alert(`A pergunta ${pIndex + 1} precisa ter pelo menos 2 alternativas preenchidas.`);
                    return;
                    }
                    if (p.correta === null || p.correta === undefined) {
                    alert(`Marque a alternativa correta da pergunta ${pIndex + 1}.`);
                    return;
                    }
                }

                // Pegando ID do organizador — ASSUNÇÃO: está em localStorage com chave "user_id"
                // Se for diferente, troque abaixo pela fonte correta (context, prop, etc).
                const organizadorId = localStorage.getItem("user_id");

                if (!organizadorId) {
                    alert("Erro: usuário não está logado! Faça login novamente.");
                    return;}


                // 1) Criar quiz
                const { data: quizCriado, error: quizErro } = await supabase
                    .from("quiz")
                    .insert([
                    {
                        nome_quiz: tema,
                        idOrganizador: organizadorId,
                        created_at: new Date().toISOString(),
                    },
                    ])
                    .select()
                    .single();

                if (quizErro) throw quizErro;

                const idQuiz = quizCriado.id_quiz || quizCriado.id || quizCriado.id_quiz; // adapta caso seu campo seja 'id' ou 'id_quiz'

                // 2) Inserir perguntas e alternativas
                for (const pergunta of perguntas) {
                    const { data: perguntaCriada, error: perguntaErro } = await supabase
                    .from("perguntas")
                    .insert([
                        {
                        enunciado: pergunta.texto,
                        tempo: pergunta.tempo,
                        id_qz: idQuiz,
                        created_at: new Date().toISOString(),
                        pontuacao: pergunta.pontos,
                        },
                    ])
                    .select()
                    .single();

                    if (perguntaErro) throw perguntaErro;

                    const idPergunta = perguntaCriada.id_pergunta || perguntaCriada.id || perguntaCriada.id_pergunta;

                    // inserir alternativas
                    for (let i = 0; i < pergunta.respostas.length; i++) {
                    const resp = pergunta.respostas[i];
                    // pular alternativas vazias
                    if (!resp || !resp.trim()) continue;

                    const correta = pergunta.correta === i;

                    const { error: altErro } = await supabase.from("alternativa").insert([
                        {
                        info: resp,
                        correta,
                        id_perg: idPergunta,
                        },
                    ]);

                    if (altErro) throw altErro;
                    }
                }
                // sucesso
                alert("Quiz criado com sucesso!");
                // limpa rascunho
                localStorage.removeItem("quiz_perguntas_v1");
                localStorage.removeItem("quiz_index_v1");
                // voltar tela inicial (prop)
                voltarTelaIniOrg();
                } catch (err) {
                console.error("Erro ao finalizar quiz:", err);
                alert("Erro ao salvar o quiz. Veja o console para mais detalhes.");
            }
        }

    return(

        <div className="pagina-criar">
            
            <div className="header-criar">
                <button className="close-create"
                    onClick={voltarTelaIniOrg}>x</button>
                <input type="text" 
                        className="input-tema"
                        placeholder="Adicione o tema"
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}/>
            </div>

            <div className="conteudo-criar">
            <div className="box-quiz">
                <input type="text"
                        className="input-pergunta"
                        placeholder="Digite a pergunta"
                        value={perguntaAtual?.texto ?? ""}
                        onChange={(e) => atualizarTextoPergunta(e.target.value)}/>
                
                <div className="lista-alternativa">
                    {(perguntaAtual?.respostas ?? ["", "", "", ""]).map((resp, i) => (
                        <div className="item-resposta" key={i}>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name={`resp-${indexAtual}`}
                                    checked={perguntaAtual?.correta === i}
                                    onChange={() => selecionarCorreta(i)}
                                />
                                <span className="fake-radio" />
                                </label>

                                <input
                                type="text"
                                className="input-resposta"
                                placeholder={`Adicionar resposta ${i + 1}`}
                                value={resp}
                                onChange={(e) => atualizarResposta(i, e.target.value)}
                                />
                            </div>
                            ))}
                        </div>
            </div>
            <div className="dados">
                <button
                className="btn-remover"
                onClick={() => removerPergunta(indexAtual)}
                disabled={perguntas.length === 1}
                >
                Remover pergunta
                </button>

                <div className="qntd-perg">
                Pergunta {indexAtual + 1} / {perguntas.length}
                </div>
            </div>
            </div>

        {/* BOTÃO QUE ABRE O PAINEL LATERAL */}
        <button className="seta-btn" onClick={() => setAbrirPainel((s) => !s)}>➤</button>

        {/* PAINEL LATERAL (pode funcionar como modal lateral) */}
        <div className={`modal-lateral ${abrirPainel ? "ativo" : ""}`}>
          <h2>Battle Quiz</h2>

          <div className="time">
            <h3>Limite de tempo</h3>
            <select
              value={perguntaAtual?.tempo ?? 20}
              onChange={(e) => atualizarCampoModal("tempo", Number(e.target.value))}
            >
              <option value={5}>5 segundos</option>
              <option value={10}>10 segundos</option>
              <option value={15}>15 segundos</option>
              <option value={20}>20 segundos</option>
            </select>
          </div>

          <div className="pontuacao">
            <h3>Pontos</h3>
            <select
              value={perguntaAtual?.pontos ?? 5}
              onChange={(e) => atualizarCampoModal("pontos", Number(e.target.value))}
            >
              <option value={2}>2 pontos</option>
              <option value={3}>3 pontos</option>
              <option value={5}>5 pontos</option>
              <option value={10}>10 pontos</option>
            </select>
          </div>

          <button className="add-pgnt" onClick={adicionarPergunta}>
            Adicionar perguntas +
          </button>

          <div className="nav-btns">
            <button className="anterior" onClick={anterior} disabled={indexAtual === 0}>
              Anterior
            </button>

            <button
              className="proximo"
              onClick={proximo}
              disabled={indexAtual === perguntas.length - 1}
            >
              Próximo
            </button>
          </div>

           {/* BOTÃO FINALIZAR */}
            <button className="finalizar-quiz" onClick={finalizarQuiz}>Finalizar Quiz ✔</button>
        </div>
      </div>
  );
}