import { CadastrarAluno } from "../components/cadastrarAluno";
import { CadastrarProfessor } from "../components/cadastrarProfessor";
import { HomeAluno } from "../components/homeAluno";
import { HomeProfessor } from "../components/homeProfessor";
import { TelaDoAdmin } from "../components/telaDoAdmin";
import { TelaLogin } from "../components/telaLogin";
import { TelaModuloAluno } from "../components/telaModuloAluno";
import { CrudTopico } from "../components/crudTopico";
import { CrudAluno } from "../components/crudAluno";
import { CrudProfessor } from "../components/crudProfessor";
import { CrudDisciplina } from "../components/crudDisciplina";
import { CrudModulo } from "../components/crudModulo";
//import { CrudDisciplina } from "../components/crudDisciplina";



export const routesConfig = [
    // "/nome da pagina"
    {id:1, path:"/",component:HomeAluno, exact: true},
    {id:2, path:"/login", component:TelaLogin, exact: true},
    {id:3, path:"/homeProfessor", component:HomeProfessor,exact: true},
    {id:4, path:"/cadastrarAluno", component:CadastrarAluno,exact: true},
    {id:5, path:"/cadastrarProfessor", component:CadastrarProfessor,exact:true},
    {id:6, path:"/telaDoAdmin", component:TelaDoAdmin,exact:true},
    {id:7, path:"/telaModuloAluno", component:TelaModuloAluno, exact:true},
    {id:8, path:"/homeAluno", component:HomeAluno, exact:true},
    {id:9, path:"/crudTopico", component:CrudTopico, exact:true},
    {id:10, path:"/crudAluno", component:CrudAluno, exact:true},
    {id:11, path:"/crudProfessor", component:CrudProfessor, exact:true},
    {id:12,path:"/crudDisciplina", component:CrudDisciplina,exact:true},
    {id:13,path:"/crudModulo", component:CrudModulo,exact:true}

    
];