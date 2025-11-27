import React, { useState, useEffect } from "react";
import Cadastro from "./components/cadastro.jsx";
import Login from "./components/login.jsx";
import TelaInicialJogador from "./components/telaInicialJog.jsx";
import AbaCriarQuizz from "./components/criarquizzes.jsx";
import "./App.css";
import TelaInicialOrganizador from "./components/telaInicialOrg.jsx";

function App() {
  //const [paginaAtual, setPaginaAtual] = useState("cadastro");

  const [paginaAtual, setPaginaAtual] = useState(
  localStorage.getItem("paginaAtual") || "cadastro"
);

useEffect(() => {
  localStorage.setItem("paginaAtual", paginaAtual);
}, [paginaAtual]);


  return (
    <div className="App">
      {paginaAtual === "cadastro" && (
       
       <Cadastro 
          irParaLogin={() => setPaginaAtual("login")} 
          irParaTelaIniJog={() => setPaginaAtual("telaInicialJog")}
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
    </div>
  );
}

export default App;
