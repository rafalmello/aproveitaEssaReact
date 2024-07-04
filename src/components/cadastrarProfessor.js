import { useState } from "react";


export function CadastrarProfessor() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [salario, setSalario] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // isso é a Exception? mensagem

    console.log('oi');
    if (!nome || !cpf || !email || !senha || !telefone || !salario) {
        setMensagem("Por favor, preencha todos os campos rt2");
        console.log(nome+' ' + cpf+' ' + email+' ' + senha+' ' + telefone+' ' + salario+' ');
      
        console.log('oi2');
        return          
    }else{
      setMensagem(' ');
      console.log('oi3');

    }
    /*
    setMensagem("Professor cadastrado com sucesso");
      setNome("");
      setCpf("");
      setEmail("");
      setSenha("");
      setTelefone("");
      setSalario("");
      */
      console.log('oi4');
      try {/*'http://localhost:8080/administrador/cadastrarProfessor'
             'http://localhost:8080/administrador/cadastrarProfessor'
        */
             console.log('oi5');
        const response = await fetch('http://localhost:8080/administrador/cadastrarProfessor',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({nome,cpf,email,senha,telefone,salario: parseInt(salario) })
        });
        if(response.ok){
          setMensagem("IF Professor cadastrado com sucesso");
          setNome("");
          setCpf("");
          setEmail("");
          setSenha("");
          setTelefone("");
          setSalario("");


        }else{
          setMensagem('ELSE Não foi possível cadastrar o Professor. Verifique os dados e tente novamente por favor.')
        }


        
      } catch (error) {
        setMensagem('CATCH Não foi possível cadastrar o Professor. Verifique os dados e tente novamente por favor.')

      }
  };

  let cadastrarProfessor =()=>{
    //fazer a lógica do cadastro aq e ligar com o beck

  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label>CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
            type="text"
            value={telefone}
            onChange={(e)=>setTelefone(e.target.value)}
            />
            
          </div>
          <div>
            <label>Salário: </label>
            <input
              type="text"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </div>
          <button type="submit" > cadastrar</button>
          {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
    </>
  );
}
