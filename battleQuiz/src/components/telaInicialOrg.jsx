import React, { useState, useRef, useEffect } from "react";
import "../styles/telaInicialOrg.css";

export default function TelaInicialOrganizador({voltarParaLogin}){
    const [abrirModal, setAbrirModal] = useState(false);
    const botaoRef = useRef(null);
    const modalRef = useRef(null);
    const [posicao, setPosicao] = useState({top:0, left:0});

    //calcula para abrir o modal
    useEffect(() => {
        if (abrirModal && botaoRef.current && modalRef.current) {
            const rectBotao = botaoRef.current.getBoundingClientRect();
            const rectModal = modalRef.current.getBoundingClientRect();
      setPosicao({
        top: rectBotao.bottom + window.scrollY + 6, // um espacinho
        // centraliza o modal: centro do botão - metade da largura do modal
        left:
          rectBotao.left +
          rectBotao.width / 2 +
          window.scrollX -
          rectModal.width / 2,
      });
    }
     }, [abrirModal]);

     //para fechar o modal
     useEffect(() => {
        const fechar = (e) => {
            if (
              !botaoRef.current?.contains(e.target) &&
              !modalRef.current?.contains(e.target)
            ) {
              setAbrirModal(false);
            }
          };
        if (abrirModal) document.addEventListener("click", fechar);
        return () => document.removeEventListener("click", fechar);

       
    }, [abrirModal]);

    return(
        <div className="container-telaio">
            <div className="header-tio">
                <div className="space-ti"></div>
                <h1 className="title">UTFPR | Battle Quiz</h1>
                <div className="perfil-btn">
                    <button className="icon" ref={botaoRef} onClick={() => setAbrirModal(!abrirModal)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"class="lucide lucide-circle-user-round-icon lucide-circle-user-round" color= "var(--roxo3)"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg></button>

                     {/* Modal */}
                    {abrirModal && (
                        <div 
                        ref={modalRef}
                        className="modal-tio"
                            style={{ top: posicao.top, left: posicao.left }}>
                            <div className="conteudo-modal">
                                <div className="nome">nome</div>
                                <div className="email">organizador@gmail.com</div>
                                <span className="logout" onClick={voltarParaLogin}>Encerrar sessão</span>
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