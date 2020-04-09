import React, { useState } from 'react';
import{ Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCopy } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

export default function Create () {
  const [title, setTitle] = useState('');
  const [initialdate, setInitialdate] = useState('');
  const [finaldate, setFinaldate] = useState('');
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleCreate(e) {
    e.preventDefault(); 
   
    const data = {
      title,
      initialdate,
      finaldate,
    };

    try {
      const response = await api.post('/projects', data);

      setId(response.data.id);

    }
    catch (err) {
      alert('Erro ao criar projeto, tente novamente.');
    }
  }

  function copy(){
    var copyText = document.getElementById("new-id");
    var textArea = document.createElement("textarea");

    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);

    textArea.select();

    document.execCommand("Copy");
    textArea.remove();

    history.push('/');
  }

  return (
    <div className="create-container">
      <div className="content">
        <section>
          <h1>Criar</h1>
          <p>Crie um projeto e organize as suas atividades</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#DAA520"/>
            Voltar para home
          </Link>

        </section>

        <form onSubmit={handleCreate}>
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

          <button className="button" type="submit">Cadastrar</button>

          <span>
            Seu ID:
            <strong id="new-id">&nbsp;{id}</strong>
            <button type="button" onClick={copy}>
              <FiCopy size={18} color="#DAA520" />
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}