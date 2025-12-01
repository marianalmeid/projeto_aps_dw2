import React, { useState } from "react";
import "../styles/criarquizzes.css";

    export default function AbaCriarQuizz({voltarTelaIniOrg}){
        const [abrirModal, setAbrirModal] = useState(false);

    return(

        <div className="pagina-criar">
            
            <div className="header-criar">
                <button className="close-create"
                    onClick={voltarTelaIniOrg}>x</button>
                <input type="text" 
                        className="input-tema"
                        placeholder="adicione o tema"/>
            </div>
            <div className="conteudo-criar">
            <div className="box-quiz">
                <input type="text"
                        className="input-pergunta"
                        placeholder="Comece a digitar a pergunta"/>
                
                <div className="lista-alternativa">
                    <div className="item-resposta">
                        <input type="radio" name="resp" 
                        className="mark"/>
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
                <button 
                    className="seta-btn"
                    onClick={() => setAbrirModal(true)}>m</button>
                    
                    {abrirModal && (
                    <button fechar={() => setAbrirModal(false)}>
                        <h2>Battle Quiz</h2>
                        <div className="time">
                            <h2>Limite de tempo</h2>
                            <select name="time" id="time">
                                <option value="5">5 segundos</option>
                                <option value="10">10 segundos</option>
                                <option value="15">15 segundos</option>
                                <option value="20">20 segundos</option>
                            </select>
                        </div>
                        <div className="pontuacao">
                        <h2>Limite de tempo</h2>
                            <select name="pont" id="pontos">
                                <option value="2">2 pontos</option>
                                <option value="3">3 segundos</option>
                                <option value="5">5 segundos</option>
                                <option value="10">10 segundos</option>
                            </select>
                        </div>
                        <div className="add-pgnt"></div>
                        <div className="next"></div>
                        </button>
                    )}
            </div>
            

        </div>
    )
};