import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./crudProfessor.css"; // Import CSS

export function CrudProfessor() {
  const [professores, setProfessores] = useState([]);//talvez eu tenha que tirar esta parte
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [salario, setSalario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [id, setId] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    const response = await fetch('http://localhost:8080/administrador/todosProfessores');
    const data = await response.json();
    setProfessores(data);
  };

  const handleSubmit = async (e) => {
    console.log(professores);
    e.preventDefault();

    if (!nome || !cpf || !email || !senha || !telefone || !salario) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const professor = { nome, cpf, email, senha, telefone, salario: parseInt(salario) };

    try {
      let response;
      if (modoEdicao) {
        response = await fetch(`http://localhost:8080/administrador/atualizarProfessor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(professor),
        });
      } else {
        response = await fetch('http://localhost:8080/administrador/cadastrarProfessor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(professor),
        });
      }

      if (response.ok) {
        setMensagem("Professor cadastrado/atualizado com sucesso!");
        fetchProfessores();
        limparCampos();
      } else {
        setMensagem("Não foi possível cadastrar/atualizar o professor. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar/atualizar o professor. Verifique os dados e tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/administrador/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMensagem("Professor deletado com sucesso!");
        fetchProfessores();
      } else {
        setMensagem("Não foi possível deletar o professor.");
      }
    } catch (error) {
      setMensagem("Erro ao deletar o professor.");
    }
  };

  const handleEdit = (professor) => {
    setId(professor.idProfessor);
    setNome(professor.nome);
    setCpf(professor.cpf);
    setEmail(professor.email);
    setSenha(professor.senha);
    setTelefone(professor.telefone);
    setSalario(professor.salario);
    setModoEdicao(true);
  };

  const limparCampos = () => {
    setNome("");
    setCpf("");
    setEmail("");
    setSenha("");
    setTelefone("");
    setSalario("");
    setId(null);
    setModoEdicao(false);
  };

  return (
    <div className="crud-container">
      <h2>Gerenciamento de Professores</h2>
      <form onSubmit={handleSubmit} className="form-professor">
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
          <label>Salário:</label>
          <input type="text" value={salario} onChange={(e) => setSalario(e.target.value)} />
        </div>
        <button type="submit" className="btn-submit">
          {modoEdicao ? "Atualizar" : "Cadastrar"}
        </button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
      <h3>Lista de Professores</h3>
      <table className="table-professor">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.idProfessor}>
              <td>{professor.nome}</td>
              <td>{professor.cpf}</td>
              <td>{professor.email}</td>
              <td>{professor.telefone}</td>
              <td>{professor.salario}</td>
              <td>
                <button onClick={() => handleEdit(professor)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(professor.idProfessor)} className="btn-delete">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
