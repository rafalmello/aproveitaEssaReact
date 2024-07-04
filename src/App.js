import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {TelaLogin} from "./components/telaLogin";
import  {HomeAluno}  from "./components/homeAluno";
import {HomeProfessor} from "./components/homeProfessor";
import {CadastrarAluno} from "./components/cadastrarAluno";
import {CadastrarProfessor} from "./components/cadastrarProfessor";
import {TelaDoAdmin} from "./components/telaDoAdmin";
import {TelaModuloAluno} from "./components/telaModuloAluno";
import {CrudTopico} from "./components/crudTopico";
import {CrudAluno} from "./components/crudAluno";
import {CrudProfessor} from "./components/crudProfessor";
import {CrudDisciplina} from "./components/crudDisciplina";
import { CrudModulo } from "./components/crudModulo";

function App() {
    return (
        
            <Routes>
            
              
                <Route path="/" element={<TelaLogin />} />
                 <Route>             </Route>
                <Route path="/homeAluno" element={<HomeAluno />} />
                <Route path="/homeProfessor" element={<HomeProfessor />} />
                <Route path="/cadastrarAluno" element={<CadastrarAluno />} />
                <Route path="/cadastrarProfessor" element={<CadastrarProfessor />} />
                <Route path="/telaDoAdmin" element={<TelaDoAdmin />} />
                <Route path="/telaModuloAluno" element={<TelaModuloAluno />} />
                <Route path="/crudTopico" element={<CrudTopico />} />
                <Route path="/crudAluno" element={<CrudAluno />} />
                <Route path="/crudProfessor" element={<CrudProfessor />} />
                <Route path="/crudDisciplina" element={<CrudDisciplina />} />
                <Route path="/crudModulo" element={<CrudModulo/>} />
            </Routes>
       
    );
}

export default App;
