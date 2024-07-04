import { useState } from "react";
import "./crudAluno.css"; // CSS separado para estilização
import {useLocation} from "react-router-dom";

export function CrudAluno() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeCurso, setNomeCurso] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); // Sucesso ou erro

    const resetForm = () => {
        setId('');
        setNome('');
        setCpf('');
        setEmail('');
        setSenha('');
        setTelefone('');
        setNomeCurso('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !cpf || !email || !senha || !telefone || !nomeCurso) {
            setMensagem('Por favor, preencha todos os campos.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/alunos/cadastrarAluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, email, senha, telefone, nomeCurso }),
            });
            if (response.ok) {
                setMensagem('Aluno cadastrado com sucesso!');
                setTipoMensagem('sucesso');
                resetForm();
            } else {
                setMensagem('Não foi possível cadastrar o aluno. Verifique se todos os campos foram preenchidos corretamente.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            setMensagem('Não foi possível cadastrar o aluno. Verifique se todos os campos foram preenchidos corretamente.');
            setTipoMensagem('erro');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!id) {
            setMensagem('Por favor, forneça o ID do aluno.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/administrador/atualizarAluno/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, email, senha, telefone, nomeCurso }),
            });
            if (response.ok) {
                setMensagem('Aluno atualizado com sucesso!');
                setTipoMensagem('sucesso');
                resetForm();
            } else {
                setMensagem('Não foi possível atualizar o aluno. Verifique se todos os campos foram preenchidos corretamente.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            setMensagem('Não foi possível atualizar o aluno. Verifique se todos os campos foram preenchidos corretamente.');
            setTipoMensagem('erro');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!id) {
            setMensagem('Por favor, forneça o ID do aluno.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/administrador/deletarAluno/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMensagem('Aluno removido com sucesso!');
                setTipoMensagem('sucesso');
                resetForm();
            } else {
                setMensagem('Não foi possível remover o aluno.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            setMensagem('Não foi possível remover o aluno.');
            setTipoMensagem('erro');
        }
    };

    const handleFetch = async (e) => {
        e.preventDefault();

        if (!id) {
            setMensagem('Por favor, forneça o ID do aluno.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/alunos/buscarAluno/${id}`);
            if (response.ok) {
                const data = await response.json();
                setNome(data.nome);
                setCpf(data.cpf);
                setEmail(data.email);
                setSenha(data.senha);
                setTelefone(data.telefone);
                setNomeCurso(data.nomeCurso);
                setMensagem('Aluno encontrado.');
                setTipoMensagem('sucesso');
            } else {
                setMensagem('Não foi possível encontrar o aluno.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            setMensagem('Não foi possível encontrar o aluno.');
            setTipoMensagem('erro');
        }
    };

    return (
        <div className="container">
            <h2>Gerenciamento de Aluno</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>ID:</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>CPF:</label>
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nome do Curso:</label>
                    <input type="text" value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)} />
                </div>
                <div className="button-group">
                    <button className="btnCadastrar" type="submit">Cadastrar</button>
                    <button className="btnAtualizar" onClick={handleUpdate}>Atualizar</button>
                    <button className="btnRemover" onClick={handleDelete}>Remover</button>
                    <button className="btnBuscar" onClick={handleFetch}>Buscar</button>
                </div>
            </form>
            {mensagem && (
                <p className={`mensagem ${tipoMensagem === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro'}`}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}
