import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CrudModulo() {
    const [alunoId, setAlunoId] = useState("");
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professorId, setProfessorId] = useState("");
    const [disciplinaId, setDisciplinaId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfessores();
        fetchDisciplinas();
    }, []);

    const fetchProfessores = async () => {
        try {
            const response = await fetch('http://localhost:8080/administrador/todosProfessores');
            const data = await response.json();
            if (Array.isArray(data)) {
                setProfessores(data);
            } else {
                setProfessores([]);
            }
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            setProfessores([]);
        }
    };

    const fetchDisciplinas = async () => {
        try {
            const response = await fetch('http://localhost:8080/disciplinas/todasDisciplinas');
            const data = await response.json();
            if (Array.isArray(data)) {
                setDisciplinas(data);
            } else {
                setDisciplinas([]);
            }
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
            setDisciplinas([]);
        }
    };

    // este metodo está repetido
    /*
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const moduloData = {
            idAluno: alunoId,
            idProfessor: professorId,
            idDisciplina: disciplinaId,
        };
    
        try {
            const response = await fetch('http://localhost:8080/administrador/criarModulo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(moduloData),
            });
    
            if (response.ok) {
                alert("Módulo criado com sucesso");
               // navigate('/homeAluno');
            } else {
                alert("Erro ao criar módulo");
            }
        } catch (error) {
            console.error("Erro ao criar módulo:", error);
            alert("Erro ao criar módulo. Tente novamente.");
        }
    };
    
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        const moduloData = {
            idAluno: alunoId,
            idProfessor: professorId,
            idDisciplina: disciplinaId,
        };

        try {
            const response = await fetch('http://localhost:8080/administrador/criarModulo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(moduloData),
            });

            if (response.ok) {
                alert("Módulo criado com sucesso");
               // navigate('/homeAluno');
            } else {
                alert("ELSE Erro ao criar módulo");
            }
        } catch (error) {
            console.error("CATCH Erro ao criar módulo:", error);
            alert("Erro ao criar módulo. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID do Aluno:</label>
                <input
                    type="text"
                    value={alunoId}
                    onChange={(e) => setAlunoId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Selecione o Professor:</label>
                <select
                    value={professorId}
                    onChange={(e) => setProfessorId(e.target.value)}
                    required
                >
                    <option value="">Selecione um professor</option>
                    {professores.map(professor => (
                        <option key={professor.id} value={professor.id}>
                            {professor.nome}
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
                <label>Selecione a Disciplina:</label>
                <select
                    value={disciplinaId}
                    onChange={(e) => setDisciplinaId(e.target.value)}
                    required
                >
                    <option value="">Selecione uma disciplina</option>
                    {disciplinas.map(disciplina => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nomeDisciplina}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Criar Módulo</button>
        </form>
    );
}

export default CrudModulo;
