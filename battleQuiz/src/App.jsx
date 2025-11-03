import React, { useState } from "react";
import Cadastro from "./components/cadastro.jsx";
import Login from "./components/login.jsx";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("cadastro");

  return (
    <div className="App">
      {paginaAtual === "cadastro" ? (
        <Cadastro irParaLogin={() => setPaginaAtual("login")} />
      ) : (
        <Login irParaCadastro={() => setPaginaAtual("cadastro")} />
      )}
    </div>
  );
}

export default App;