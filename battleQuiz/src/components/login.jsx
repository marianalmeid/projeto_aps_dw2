import React, { useState } from "react";
import "../styles/login.css";

export default function Login({ irParaCadastro, irParaTelaIniJog }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
              placeholder="NOME OU E-MAIL"
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
              type={mostrarSenha ? "text" : "password"}
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

          <a href="#" className="forgot-password">Esqueci minha senha</a>

          <button className="btn-login" onClick={irParaTelaIniJog}>Entrar</button>
        </form>

        <p className="back-text">
          Ainda não tem conta?{" "}
          <span onClick={irParaCadastro}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}