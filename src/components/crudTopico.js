import { useState } from "react";

export function CrudTopico() {
    const [nome, setNome] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [tipo, setTipo] = useState('EXERCICIO'); // Valor padrão
    const [mensagem, setMensagem] = useState('');
    const [topicoId, setTopicoId] = useState(''); // Para armazenar o ID do tópico

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleCargaHorariaChange = (e) => {
        setCargaHoraria(e.target.value);
    };

    const handleTipoChange = (e) => {
        setTipo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nome.trim() === '' || cargaHoraria.trim() === '' || cargaHoraria <= 0) {
            setMensagem('Nome e carga horária são obrigatórios e devem ser válidos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/topicos/cadastrarTopico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cargaHoraria: parseInt(cargaHoraria), tipo }),
            });
            if (response.ok) {
                setMensagem('Tópico criado com sucesso!');
                setNome('');
                setCargaHoraria('');
                setTipo('EXERCICIO'); // Resetar para o valor padrão
            } else {
                setMensagem('Não foi possível criar o tópico. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setMensagem('Não foi possível criar o tópico. Verifique os dados e tente novamente.');
        } 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!topicoId) {
            setMensagem('Por favor, informe o ID do tópico para atualizar.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/topicos/${topicoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cargaHoraria: parseInt(cargaHoraria), tipo }),
            });
            if (response.ok) {
                setMensagem('Tópico atualizado com sucesso!');
            } else {
                setMensagem('Não foi possível atualizar o tópico. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setMensagem('Não foi possível atualizar o tópico. Verifique os dados e tente novamente.');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!topicoId) {
            setMensagem('Por favor, informe o ID do tópico para remover.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/topicos/${topicoId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMensagem('Tópico removido com sucesso!');
            } else {
                setMensagem('Não foi possível remover o tópico. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setMensagem('Não foi possível remover o tópico. Verifique os dados e tente novamente.');
        }
    };

    const handleFetch = async (e) => {
        e.preventDefault();

        if (!topicoId) {
            setMensagem('Por favor, informe o ID do tópico para buscar.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/topicos/${topicoId}`);
            if (response.ok) {
                const data = await response.json();
                setNome(data.nome);
                setCargaHoraria(data.cargaHoraria);
                setTipo(data.tipo);
                setMensagem('Tópico encontrado.');
            } else {
                setMensagem('Não foi possível encontrar o tópico. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setMensagem('Não foi possível encontrar o tópico. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Gerenciamento de Tópico</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>ID do Tópico:</label>
                    <input type="text" value={topicoId} onChange={(e) => setTopicoId(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nome:</label>
                    <input type="text" value={nome} onChange={handleNomeChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Carga Horária:</label>
                    <input type="number" value={cargaHoraria} onChange={handleCargaHorariaChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Tipo de Tópico:</label>
                    <select value={tipo} onChange={handleTipoChange} style={styles.input}>
                        <option value="EXERCICIO">Exercício</option>
                        <option value="LINKS">Links</option>
                        <option value="AULA">Aula</option>
                        <option value="TEXTO">Texto</option>
                        <option value="PROVA">Prova</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Cadastrar</button>
                <button onClick={handleUpdate} style={styles.button}>Atualizar</button>
                <button onClick={handleDelete} style={styles.button}>Remover</button>
                <button onClick={handleFetch} style={styles.button}>Buscar</button>
            </form>
            {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
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
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '3px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px 0', // Adiciona espaçamento entre os botões
    },
    mensagem: {
        marginTop: '15px',
        fontSize: '14px',
        color: 'red',
    },
};
