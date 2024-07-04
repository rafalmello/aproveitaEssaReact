import { useState } from "react"
import { Link } from "react-router-dom";


export function CadastrarAluno  (){
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeCurso, setNomeCurso] = useState('');

    const [mensagem, setMensagem] = useState('');

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !cpf || !email || !senha || !telefone || !nomeCurso) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }
        // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor.

       //setMensagem('Aluno cadastrado com sucesso!');
        //setNome('');
       // setCpf('');
       // setEmail('');
       // setSenha('');
        //setTelefone('');
       // setNomeCurso('');
        
        

    try {
        const response = await fetch('http://localhost:8080/administrador/cadastrarAluno',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nome,cpf,email,senha,telefone,nomeCurso}),
        });
        if(response.ok){
            setMensagem('Aluno cadastrado com sucesso!');
            setNome('');
            setCpf('');
            setEmail('');
            setSenha('');
            setTelefone('');
            setNomeCurso('');

        }else{
            setMensagem('ELSE Não foi possível cadastrar o aluno. Verifique se todos os campos foram preenchidos corretamente');
        }
        
    } catch (error) {
        setMensagem('CATCH Não foi possível cadastrar o aluno. Verifique se todos os campos foram preenchidos corretamente');
 
        
    }
    };

    let cadastrarAluno=()=>{
        //fazer a lógica do cadastro aq e ligar com o beck
        <Link to="/cadastrarAluno">Cadastrar Aluno</Link> //dps de cadastrar com sucesso, ir para a tela de aluno
    }

    return(
        <>
         <div>     
            <h2>Cadastro de Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>CPF:</label>
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div>
                    <label>Nome do Curso:</label>
                    <input type="text" value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)} />
                </div>
                <button className="btnCadastrarAluno" type="submit" onClick={cadastrarAluno}>Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
       
        </>

    );
}

