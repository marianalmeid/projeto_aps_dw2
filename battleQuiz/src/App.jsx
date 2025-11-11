import React, { useState } from "react";
import Cadastro from "./components/cadastro.jsx";
import Login from "./components/login.jsx";
import TelaInicialJogador from "./components/telaInicialJog.jsx";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("cadastro");

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
          irParaTelaIniJog={() => setPaginaAtual("telaInicialJog")} />
      )}

      {paginaAtual === "telaInicialJog" && (
        <TelaInicialJogador />
      )}
    </div>
  );
}

export default App;
