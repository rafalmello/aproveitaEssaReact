import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Corrigido para usar useNavigate
import AuthService from "../service/AuthService";


export function TelaLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const[message,setMessage] = useState('');
    const navigate = useNavigate(); // Ativando o hook de navegação

    

        /*const handleLogin = async (e) => {
            if (!email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }
    
            e.preventDefault();
            try {
                const response = await AuthService.login({ email, senha });
                if (response.data === 'login realizado com sucesso') {
                    navigate('/homeAluno');
                } else {
                    setMessage('Invalid credentials');
                }
            } catch (error) {
                setMessage('Invalid credentials');
            }// está aq só para testar o front
        
    
    };*/

    return (
        <div className="login-container">
            <h3>Login:</h3>
            <input
                type="text"
                className="txtLogin"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Digite seu email"
            />
            <h3>Senha:</h3>
            <input
                type="password"
                className="txtPassword"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Digite sua senha"
            />
            <br />
            <button className="btnEntrar" type="button" >Entrar</button>
            <br />
            <a href="/cadastrarAluno">Fazer o cadastro</a>
        </div>
    );
}
