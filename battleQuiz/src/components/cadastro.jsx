import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/cadastro.css";

export default function Cadastro({ irParaLogin}) {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");


  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

 

  const handleCadastro = async () => {
    setErro("");

    if (!nome || !email || !senha || !confirmarSenha || !tipoUsuario) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setCarregando(true);

    //faz o cadastro
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

     if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    //salva no banco de dads
    const userId = data.user.id;
    const { error: profileError } = await supabase
      .from("pessoa")
      .insert([
        {
          id: user.id,
          email: email,
          nome: nome,
          usuario: tipoUsuario,
        }
      ]);
      
      if (insertError) {
        alert(insertError.message);
        return;
      }
      alert("Usuário cadastrado com sucesso!");

      
    if (profileError) {
      setErro(profileError.message);
      setCarregando(false);
      return;
    }

    setCarregando(false);

    

    // Vai para tela de login
    irParaLogin();
  };


  return (
    <div className="container">
      {/* Lado esquerdo */}
      <div className="left-panel">
        <h2>Bem – Vindo de volta!</h2>
        <p className="little-text">Acesse sua conta agora mesmo</p>
        <button className="btn-enter" onClick={irParaLogin}>Entrar</button>
      </div>

      {/* Lado direito */}
      <div className="right-panel">
        <h1 className="title">UTFPR | <span>Battle Quiz</span></h1>
        <h2 className="subtitle">Crie sua conta</h2>
        <p className="small-text">Cadastre seus dados</p>

        <form className="cadastro-form">
          {/* Nome */}
          <div className="c-input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></i>
            <input 
              className="cadastro-input" 
              type="text" 
              placeholder="NOME" 
              onChange={(e) => setNome(e.target.value)}/>
            <div className="space"></div>
          </div>

          {/* E-mail */}
          <div className="c-input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></i>
            <input 
              className="cadastro-input" 
              type="email" 
              placeholder="E-MAIL"
              onChange={(e) => setEmail(e.target.value)} />
            <div className="space"></div>
          </div>


          {/* Senha */}
          <div className="c-input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg></i>
            <div className="input-wrapper">
              <input
                className="cadastro-input"
                type={mostrarSenha ? "text" : "password"}
                placeholder="SENHA"
                onChange={(e) => setSenha(e.target.value)}
              />

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
           <div className="space"></div>
          </div>

          {/* Confirmar senha */}
          <div className="c-input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></i>
            <div className="input-wrapper">
              <input
                className="cadastro-input"
                type={mostrarConfirmarSenha ? "text" : "password"}
                placeholder="CONFIRMAR SENHA"
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />

              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
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
            <div className="space"></div>
          </div>

          {/* Selecionar Usuário */}
          <div className="c-input-group">
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#673ab7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></i>
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}>
              <option value="">USUÁRIO</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>

             
            <div className="space"></div>
            {/* ERRO */}
             {erro && <p className="erro">{erro}</p>}

          </div>
        </form>
        <button className="btn-cadastro" 
        onClick={handleCadastro}
        disabled={carregando}>{carregando ? "Cadastrando..." : "Cadastrar"}</button>


      </div>
    </div>
  );
}
