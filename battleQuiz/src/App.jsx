import React, { useState, useEffect } from "react";
import Cadastro from "./components/cadastro.jsx";
import Login from "./components/login.jsx";
import TelaInicialJogador from "./components/telaInicialJog.jsx";
import AbaCriarQuizz from "./components/criarquizzes.jsx";
import "./App.css";
import TelaInicialOrganizador from "./components/telaInicialOrg.jsx";

import TelaQuiz from "./components/TelaQuiz.jsx";
import RankingJog from "./components/rankingJog.jsx";


function App() {
  const [paginaAtual, setPaginaAtual] = useState(
  localStorage.getItem("paginaAtual") || "cadastro"
  );

  const [resultadoQuiz, setResultadoQuiz] = useState(null);
  const [idSelecionado, setIdSelecionado] = useState(null);

  useEffect(() => {
    localStorage.setItem("paginaAtual", paginaAtual);
  }, [paginaAtual]);

  function finalizarQuiz(dados) {
    setResultadoQuiz(dados);
    setPaginaAtual("rankingJog");
  }

  return (
    <div className="App">
      {paginaAtual === "cadastro" && (
       
       <Cadastro 
          irParaLogin={() => setPaginaAtual("login")} 
        />
      )}

      {paginaAtual === "login" && (
        <Login 
          irParaCadastro={() => setPaginaAtual("cadastro")}
          irParaTelaIniJog={() => setPaginaAtual("telaInicialJog")}
          irParaTelaIniOrg={() => setPaginaAtual("telaInicialOrg")} />
      )}

      {paginaAtual === "telaInicialJog" && (
        <TelaInicialJogador 
        voltarParaLogin={() => setPaginaAtual("login")}/>
      )}

      {paginaAtual === "telaInicialOrg" && (
        <TelaInicialOrganizador
        voltarParaLogin={() => setPaginaAtual("login")} 
        irParaAbaCriar={() => setPaginaAtual("criarquizzes")}/>
        
      )}

      {paginaAtual === "criarquizzes" && (
        <AbaCriarQuizz
        voltarTelaIniOrg={() => setPaginaAtual("telaInicialOrg")}/>
      )}

      {paginaAtual === "quiz" && (
        <TelaQuiz
          idQuiz={idSelecionado}
          voltar={() => setPaginaAtual("telaInicialJog")}
          finalizarQuiz={finalizarQuiz}
        />
      )}

      {paginaAtual === "rankingJog" && (
        <RankingJog
          resultado={resultadoQuiz}
          voltar={() => setPaginaAtual("telaInicialJog")}
        />
      )}
    </div>
  );
}

export default App;
