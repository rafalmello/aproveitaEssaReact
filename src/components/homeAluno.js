import { useState } from "react";
import { Navigate } from "react-router-dom";
//import "./homeAluno.css"; // Importar o CSS para estilização

export function HomeAluno() {
    const [janelaAberta, setJanelaAberta] = useState(false);

    const voltar = () => {
        setJanelaAberta(false);
        console.log('Voltar para a tela de login');
    };

    const irParaTelaModulos = () => {
        console.log('Ir para a tela de módulos');
    };

    const mostrarTabelaModulos = () => {
        // Lógica para mostrar a tabela de módulos
    };

    const trazerMateria = () => {
        // Lógica para trazer a matéria
    };

   /* const handleCriarModulo = async () =>{
        try {
            const resposta = await fetch('http://localhost:8080/administrador/criarModulo/{id}',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            }
            });
            if(resposta.ok){
                const modulo = await resposta.json();
                if(modulo){
                    alert("Modulo criado com sucesso");
                    //Navigate('')
                }else{
                    alert("não foi possível criar o modulo")
                }
            }
            
        } catch (error) {
            
        }
    }*/

    return (
        <div className="home-aluno-container">
            <h1 className="titulo">Tela Principal do Aluno</h1>
            <div className="botao-container">
                <button className="btn-acoes" onClick={trazerMateria}>Trazer matéria nova</button>
                <button className="btn-acoes">Ver matérias que eu já trouxe</button>
                <button className="btn-acoes" onClick={irParaTelaModulos}>Acessar meus módulos</button>
                <button className="btn-acoes">Sugerir Tópico</button>
                <button className="btnCriarModulo" onClick={test}>Criar Modulo</button>
            </div>
            <div className="criar-modulo">
                {/* Lógica adicional pode ser adicionada aqui */}
            </div>
        </div>
    );
}
