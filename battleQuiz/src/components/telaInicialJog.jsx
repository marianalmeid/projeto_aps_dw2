import React, { useState, useRef, useEffect } from "react";
import "../styles/telaInicialJog.css";

export default function TelaInicialJogador(){
    const [abrirModal, setAbrirModal] = useState(false);
    const botaoRef = useRef(null);
    const [posicao, setPosicao] = useState({top:0, left:0});

    //calcula para abrir o modal
    useEffect(() => {
    if (abrirModal && botaoRef.current) {
      const rect = botaoRef.current.getBoundingClientRect();
      setPosicao({
        top: rect.bottom + window.scrollY + 5, // um espacinho abaixo
        left: rect.left + window.scrollX
        });
        }
     }, [abrirModal]);

     //para fechar o modal
     useEffect(() => {
        const fechar = (e) => {
            if (!botaoRef.current?.contains(e.target)) {
                setAbrirModal(false);
            }
        };
        if (abrirModal) document.addEventListener("click", fechar);
        return () => document.removeEventListener("click", fechar);
    }, [abrirModal]);

    return(
        <div className="container-telain">
            <div className="header-tij">
                <div className="space-ti"></div>
                <h1 className="title">Tela inicial</h1>
                <div className="perfil-btn">
                    <button className="icon" ref={botaoRef} onClick={() => setAbrirModal(!abrirModal)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round" color= "var(--roxo1)"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg></button>

                     {/* Modal */}
                    {abrirModal && (
                        <div className="modal-tij"
                            style={{ top: posicao.top, left: posicao.left }}>
                        <p>🧪 Modal abaixo do botão!</p>
                        <button onClick={() => setAbrirModal(false)}>x</button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="box">
            </div>
        </div>
    );
}