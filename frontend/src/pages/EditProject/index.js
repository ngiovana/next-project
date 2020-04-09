import React, { useState } from 'react';
import{ Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

export default function EditProject () {
  const [title, setTitle] = useState(localStorage.getItem('projectTitle'));
  const [initialdate, setInitialdate] = useState(localStorage.getItem('projectInitialdate'));
  const [finaldate, setFinaldate] = useState(localStorage.getItem('projectFinaldate'));
  const id = localStorage.getItem('projectId');

  const history = useHistory();

  async function handleEditProject(e) {
    e.preventDefault(); 
   
    const data = {
      title,
      initialdate,
      finaldate,
    };

    try {
      await api.post(`/projects/edit/${id}`, data);

      const response = await api.post('sessions', { id });
      
      localStorage.setItem('projectTitle', response.data.title);
      localStorage.setItem('projectInitialdate', response.data.initialdate);
      localStorage.setItem('projectFinaldate', response.data.finaldate);

      history.push('/profile');
    }
    catch (err) {
      alert('Erro ao atualizar projeto, tente novamente.');
    }
  }

  return (
    <div className="project-edit-container">
      <div className="content">
        <section>
        <h1>Editar {title}</h1>
          <p>Crie um projeto e organize as suas atividades</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#DAA520"/>
            Voltar para perfil
          </Link>

        </section>

        <form onSubmit={handleEditProject}>
          <input 
            placeholder="Nome do Projeto"
            value={title}
            onChange={e => setTitle(e.target.value)}
           />

          <input 
            title="Data inicial"
            type="date" 
            value={initialdate}
            onChange={e => setInitialdate(e.target.value)}
          />
          
          <input 
            type="date"
            title="Data Final" 
            value={finaldate}
            onChange={e => setFinaldate(e.target.value)}  
          />

          <button className="button" type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
}