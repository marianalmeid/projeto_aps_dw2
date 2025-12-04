import React, { useEffect, useState } from "react";
import "../styles/criarquizzes.css";

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

        const perguntaAtual = perguntas[indexAtual];

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
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                className="btn-remover"
                onClick={() => removerPergunta(indexAtual)}
                disabled={perguntas.length === 1}
                >
                Remover pergunta
                </button>

                <div style={{ marginLeft: "auto", alignSelf: "center", color: "#4a2a5b" }}>
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
              <option value="5">5 segundos</option>
              <option value="10">10 segundos</option>
              <option value="15">15 segundos</option>
              <option value="20">20 segundos</option>
            </select>
          </div>

          <div className="pontuacao">
            <h3>Pontos</h3>
            <select
              value={perguntaAtual?.pontos ?? 5}
              onChange={(e) => atualizarCampoModal("pontos", Number(e.target.value))}
            >
              <option value="2">2 pontos</option>
              <option value="3">3 pontos</option>
              <option value="5">5 pontos</option>
              <option value="10">10 pontos</option>
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
        </div>
      </div>
  );
}