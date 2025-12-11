
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/login.css";

export default function Login({ irParaCadastro, irParaTelaIniJog, irParaTelaIniOrg }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const handleLogin = async (e) => {
  e.preventDefault();

    // 1. LOGIN
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  if (error) {
    console.error("Erro no login:", error.message);
    alert("E-mail ou senha incorretos!");
    return;
  }

  console.log("LOGIN OK:", loginData);

  //armazena o id do usuario
  const {data: { session },} = await supabase.auth.getSession();
  
  if (session?.user?.id) {
  localStorage.setItem("user_id", session.user.id);}


  const userId = loginData.user.id;

  // 2. PEGAR TIPO DO USUÁRIO
  const { data: pessoaDB, error: erroPessoa } = await supabase
    .from("pessoa")
    .select("tipoUsuario")
    .eq("id", userId)
    .single();

  if (erroPessoa || !pessoaDB) {
    console.error("Erro ao buscar tipoUsuario:", erroPessoa);
    alert("Erro ao carregar informações do usuário!");
    return;
  }

  const usuario = pessoaDB.tipoUsuario;

  console.log("TIPO DO USUÁRIO É:", usuario);

  // 3. REDIRECIONAR
  if (usuario === 2) {
    irParaTelaIniJog();
  } else if (usuario === 1) {
    irParaTelaIniOrg();
  } else {
    console.error("Tipo de usuário inválido:", usuario);
    alert("Tipo de usuário desconhecido!");
  }  
  };

  return (
    <div className="login-container">
      <h1 className="title">
        UTFPR | <span>Battle Quiz</span>
      </h1>

      <div className="login-box">
        <h2>Bem – Vindo de volta!</h2>
        <p>Preencha os dados do login para entrar</p>

        <form className="login-form">
          {/* CAMPO NOME / EMAIL */}
          <div className="l-input-group">
            <i className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" color="#fff"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </i>

            <input
              className="login-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
            />
          </div>

          {/* CAMPO SENHA */}
          <div className="l-input-group senha-group">
            <i className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" color="#fff"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="16" r="1"/>
                <rect x="3" y="10" width="18" height="12" rx="2"/>
                <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
              </svg>
            </i>

            <input
              className="login-input"
              value={senha}
              type={mostrarSenha ? "text" : "password"}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="SENHA"
            />

            {/* OLHINHO */}
            <button
              type="button"
              className="toggle-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.52 0-10-4.48-10-8 
                           0-1.61.64-3.11 1.78-4.53m3.1-2.57A9.77 9.77 0 0 1 12 4c5.52 0 
                           10 4.48 10 8 0 1.4-.47 2.8-1.36 4.06M9.53 9.53A3.5 3.5 0 0
                           1 14.47 14.47M1 1l22 22"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          <button className="btn-login" onClick={handleLogin}>Entrar</button>
        </form>

        <p className="back-text">
          Ainda não tem conta?{" "}
          <span onClick={irParaCadastro}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}