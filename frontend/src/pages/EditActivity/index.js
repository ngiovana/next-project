import React, { useState } from 'react';
import{ Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

export default function EditActivity() {
  const [name, setName] = useState(localStorage.getItem('activityName'));
  const [initdate, setInitDate] = useState(localStorage.getItem('activityInitdate'));
  const [enddate, setEnddate] = useState(localStorage.getItem('activityEnddate'));
  const [ended, setEnded] = useState('');
  const id = localStorage.getItem('activityId');

  const history = useHistory();

  async function handleEditActivity(e) {
    e.preventDefault();

    const data = {
      name,
      initdate,
      enddate,
      ended,
    };
    try{
      await api.post(`/activity/edit/${id}`, data);

      localStorage.removeItem('activityName');
      localStorage.removeItem('activityInitdate');
      localStorage.removeItem('activityEnddate');
      localStorage.removeItem('activityId');
      
      history.push('/profile');
    }
    catch (err) {
      alert('Erro ao editar caso, tente novamente. ');
    }
  }

  return (
    <div className="edit-activity-container">
      <div className="content">
        <section>
          <h1>Editar atividade {name}</h1>
          <p>Planeje as atividades de seu projeto</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#DAA520"/>
            Voltar para perfil
          </Link>

        </section>

        <form onSubmit={handleEditActivity}>
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

          <button className="button" type="submit">Atualizar</button>

        </form>
      </div>
    </div>
  );
}