import React from "react";
import "../styles/login.css";

export default function Login({ irParaCadastro }) {
  return (
    <div className="login-container">
      <h1 className="title">
        UTFPR | <span>Battle Quiz</span>
      </h1>

      <div className="login-box">
        <h2>Bem – Vindo de volta!</h2>
        <p>Preencha os dados do login para entrar</p>

        <form className="login-form">
          <div className="l-input-group">
            <i className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" color="#fff" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </i>
            <input className="login-input" type="text" placeholder="NOME OU E-MAIL" />
            <div className="space"></div>
          </div>

          <div className="l-input-group">
            <i className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" color="#fff" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
            </i>
            <input className="login-input" type="password" placeholder="SENHA" />
            <div className="space"></div>
          </div>

          <a href="#" className="forgot-password">Esqueci minha senha</a>

          <button className="btn-login">Entrar</button>
        </form>

        <p className="back-text">
          Ainda não tem conta?{" "}
          <span onClick={irParaCadastro}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}