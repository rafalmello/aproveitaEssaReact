import { useState, useEffect } from "react";
//import "./crudDisciplina.css "; // Import CSS
import {useLocation} from "react-router-dom";

export function CrudDisciplina() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nomeDisciplina, setNomeDisciplina] = useState("");
  const [ementa, setEmenta] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [conteudos, setConteudos] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [id, setId] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const[idAluno,setAlunoId]= useState("");

  useEffect(() => {
    fetchDisciplinas();
  }, []); 

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('http://localhost:8080/disciplinas/todasDisciplinas');
      if (!response.ok) {
        throw new Error("Erro ao buscar disciplinas"); // Verifique se a resposta é válida
      }
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      setMensagem("Erro ao buscar disciplinas. Tente novamente mais tarde.");
      console.error("Erro ao buscar disciplinas:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ano || !semestre || !nomeDisciplina || !ementa || !instituicao || !conteudos) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const disciplina = { ano, semestre, nomeDisciplina, ementa, instituicao, conteudos: conteudos.split(",") };

    try {
      let response;
      if (modoEdicao) {
        response = await fetch(`http://localhost:8080/disciplinas/atualizarDisciplina/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(disciplina),
        });
      } else {
        //                        http://localhost:8080/
        response = await fetch('http://localhost:8080/disciplinas/criarDisciplina', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(disciplina),
        });
      }

      if (response.ok) {
        setMensagem("Disciplina cadastrada/atualizada com sucesso!");
        fetchDisciplinas();
        limparCampos();
      } else {
        setMensagem("Não foi possível cadastrar/atualizar a disciplina. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar/atualizar a disciplina. Verifique os dados e tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/disciplinas/deletarDisciplina/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMensagem("Disciplina deletada com sucesso!");
        fetchDisciplinas();
      } else {
        setMensagem("Não foi possível deletar a disciplina.");
      }
    } catch (error) {
      setMensagem("Erro ao deletar a disciplina.");
    }
  };

  const handleEdit = (disciplina) => {
    setId(disciplina.idDisciplina);
    setAno(disciplina.ano);
    setSemestre(disciplina.semestre);
    setNomeDisciplina(disciplina.nomeDisciplina);
    setEmenta(disciplina.ementa);
    setInstituicao(disciplina.instituicao);
    setConteudos(disciplina.conteudos.join(","));
    setModoEdicao(true);
  };

  const limparCampos = () => {
    setAno("");
    setSemestre("");
    setNomeDisciplina("");
    setEmenta("");
    setInstituicao("");
    setConteudos("");
    setId(null);
    setModoEdicao(false);
  };

  return (
    <div className="crud-container">
      <h2>Gerenciamento de Disciplinas</h2>
      <form onSubmit={handleSubmit} className="form-disciplina">
        <div className="form-group">
          <label>Ano:</label>
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Semestre:</label>
          <input type="number" value={semestre} onChange={(e) => setSemestre(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nome da Disciplina:</label>
          <input type="text" value={nomeDisciplina} onChange={(e) => setNomeDisciplina(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ementa:</label>
          <input type="text" value={ementa} onChange={(e) => setEmenta(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Instituição:</label>
          <input type="text" value={instituicao} onChange={(e) => setInstituicao(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Conteúdos (separados por vírgula):</label>
          <input type="text" value={conteudos} onChange={(e) => setConteudos(e.target.value)} />
        </div>
        <button type="submit" className="btn-submit">
          {modoEdicao ? "Atualizar" : "Cadastrar"}
        </button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
      <h3>Lista de Disciplinas</h3>
      <table className="table-disciplina">
        <thead>
          <tr>
            <th>Ano</th>
            <th>Semestre</th>
            <th>Nome</th>
            <th>Ementa</th>
            <th>Instituição</th>
            <th>Conteúdos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina.idDisciplina}>
              <td>{disciplina.ano}</td>
              <td>{disciplina.semestre}</td>
              <td>{disciplina.nomeDisciplina}</td>
              <td>{disciplina.ementa}</td>
              <td>{disciplina.instituicao}</td>
              <td>{disciplina.conteudos.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(disciplina)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(disciplina.idDisciplina)} className="btn-delete">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
