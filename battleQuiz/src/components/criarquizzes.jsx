import React from "react";
import "../styles/criarquizzes.css";

    export default function AbaCriarQuizz({voltarTelaIniOrg}){
    return(

        <div className="pagina-criar">
            
            <div className="header-criar">
                <button className="close-create"
                    onClick={voltarTelaIniOrg}>x</button>
                <input type="text" 
                        className="input-tema"
                        placeholder="adicione o tema"/>
            </div>
            
            <div className="box-quiz">
                <input type="text"
                        className="input-pergunta"
                        placeholder="Comece a digitar a pergunta"/>
                
                <div className="lista-alternativa">
                    <div className="item-resposta">
                        <input type="radio" name="resp" />
                        <input
                            type="text"
                            placeholder="Adicionar resposta 1"
                            className="input-resposta"/>
                    </div>
                    <div className="item-resposta">
                        <input type="radio" name="resp" />
                        <input
                            type="text"
                            placeholder="Adicionar resposta 2"
                            className="input-resposta"/>
                    </div>
                    <div className="item-resposta">
                        <input type="radio" name="resp" />
                        <input
                            type="text"
                            placeholder="Adicionar resposta 3 (opcional)"
                            className="input-resposta"/>
                    </div>
                    <div className="item-resposta">
                        <input type="radio" name="resp" />
                        <input
                            type="text"
                            placeholder="Adicionar resposta 4 (opcional)"
                            className="input-resposta"/>
                    </div>
                </div>
            </div>

        </div>
    )
};