import { useState } from "react";
import { useLocation } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export function TelaDoAdmin() {
  //const navigate = useNavigate();

  const irParaTelaCadProf = () => {
    //navigate('/cadastrar-professor');
  };

  const irParaTelaCadTopico = () => {
   // navigate('/cadastrar-topico');
  };

  const irParaTelaDeletarTopico = () => {
    //navigate('/deletar-topico');
  };

  const irParaAtualizarTopico = () => {
   // navigate('/atualizar-topico');
  };

  const irParaTelaBuscarTopico = () => {
   // navigate('/buscar-topico');
  };

  return (
    <div style={styles.container}>
      <h1>Administração</h1>
      <button className="cadastrarProfessor" type="button" onClick={irParaTelaCadProf} style={styles.button}>Cadastrar Professor</button>
      <button className="cadastrarTopico" type="button" onClick={irParaTelaCadTopico} style={styles.button}>Cadastrar Tópico</button>
      <button className="deletarTopico" type="button" onClick={irParaTelaDeletarTopico} style={styles.button}>Deletar Tópico</button>
      <button className="atualizarTopico" type="button" onClick={irParaAtualizarTopico} style={styles.button}>Atualizar Tópico</button>
      <button className="buscarTopico" type="button" onClick={irParaTelaBuscarTopico} style={styles.button}>Buscar Tópico</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  button: {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
