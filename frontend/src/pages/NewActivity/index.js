import React, { useState } from 'react';
import{ Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

export default function NewActivity() {
  const[name, setName] = useState('');
  const[initdate, setInitDate] = useState('');
  const[enddate, setEnddate] = useState('');
  const[ended, setEnded] = useState(false);

  const history = useHistory();

  const projectId = localStorage.getItem('projectId');
   
  async function handleNewActivity(e) {
    e.preventDefault();

    const data = {
      name,
      initdate,
      enddate,
      ended,
    };
    try{
      await api.post('activity', data, { 
        headers: { Authorization: projectId,}
    })
      
      history.push('/profile');
    }
    catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-activity-container">
      <div className="content">
        <section>
          <h1>Cadastrar nova atividade</h1>
          <p>Planeje as atividades de seu projeto</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#DAA520"/>
            Voltar para perfil
          </Link>

        </section>

        <form onSubmit={handleNewActivity}>
          <input 
            placeholder="Nome da atividade" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            title="Data inicial"
            type="date" 
            value={initdate}
            onChange={e => setInitDate(e.target.value)}
          />
          <input 
            title="Data final" 
            type="date"
            value={enddate}
              onChange={e => setEnddate(e.target.value)}
          />
          <input 
            name="ended"
            className="check"
            type="checkbox"
            value="true"
            onChange={e => setEnded(e.target.value)}
          />
          <label className="final" for="ended">Finalizada</label>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}