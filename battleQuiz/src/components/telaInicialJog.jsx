import React, { useState } from "react";
import "../styles/telaInicialJog.css";

export default function TelaInicialJogador(){
    const [abrirModal, setAbrirModal] = useState(false);
    return(
        <div className="container-telain">
            <div className="header-telain">
                <div className="space-ti"></div>
                <h1 className="title">Tela inicial</h1>
                <div className="perfil-btn">
                    <button onClick={() => setAbrirModal(true)}>Abrir Modal</button>

                     {/* Modal */}
                    {abrirModal && (
                        <div style={estiloFundo}>
                        <div style={estiloModal}>
                            <h2>Este é o modal!</h2>
                            <p>Conteúdo dentro do modal</p>
                            <button onClick={() => setAbrirModal(false)}>Fechar</button>
                        </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="box">
            </div>
        </div>
    );
}