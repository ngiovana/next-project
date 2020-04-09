import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/teste.png';

export default function Search() {
  const [id, setId] = useState('');
  const [projects, setProjects] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  });

  async function handleLogin(e) {
    e.preventDefault();
    
    try{
      const response = await api.post('sessions', { id });

      localStorage.setItem('projectId', id);
      localStorage.setItem('projectTitle', response.data.title);
      localStorage.setItem('projectInitialdate', response.data.initialdate);
      localStorage.setItem('projectFinaldate', response.data.finaldate);
      
      history.push('/profile');
    }
    catch (err) {
      alert('Falha na pesquisa, tente novamente.');
    }
  }

  return(
<div className="search-container">

  <header>
    <h1>Next Project</h1>
    <p>Crie projetos e organize-se</p>
  </header>

  <img className="img" src={logoImg} alt="Next Project"/> 
  
  <section className="form">

    <form onSubmit={handleLogin}>
      <h1>Visualize seu projeto</h1>

      <input 
        placeholder="ID do Projeto"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button className="button" type="submit">Ir</button>

      <Link className="back-link" to="/create">
        <FiLogIn size={16} color="#DAA520"/>
        Cadastrar um projeto
      </Link>
    </form>
  </section>

  <section className="project-list">
    <h1>Projetos Cadastrados</h1>
      <ul>
        {projects.map(projects => (
          <li key={projects.id}>
         
          <strong>ID:</strong>
          <p>{projects.id}</p>

          <strong>PROJETO:</strong>
          <p>{projects.title}</p>

          <strong>DATA INICIAL:</strong>
          <p>{projects.initialdate.split('-').reverse().join('-')}</p>

          <strong>DATA FINAL:</strong>
          <p>{projects.finaldate.split('-').reverse().join('-')}</p>

        </li>
        ))}
      </ul>
  </section>

</div>
  );
}