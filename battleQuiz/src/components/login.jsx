import React from "react";
import "../styles/login.css";

export default function Login() {
  return (
    <div className="container">
      {/* Lado esquerdo */}
      <div className="left-panel">
        <h2>Bem – Vindo de volta!</h2>
        <p>Acesse sua conta agora mesmo</p>
        <button className="btn-enter">Entrar</button>
      </div>

      {/* Lado direito */}
      <div className="right-panel">
        <h1 className="title">UTFPR | <span>Battle Quiz</span></h1>
        <h2 className="subtitle">Crie sua conta</h2>
        <p className="small-text">Cadastre seus dados</p>

        <form className="form">
          <div className="input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></i>
            <input type="text" placeholder="NOME" />
          </div>

          <div className="input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></i>
            <input type="email" placeholder="E-MAIL" />
          </div>

          <div className="input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg></i>
            <input type="password" placeholder="SENHA" />
          </div>

          <div className="input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></i>
            <input type="password" placeholder="CONFIRMAR SENHA" />
          </div>

          <div className="input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></i>
            <select>
              <option value="">USUÁRIO</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
