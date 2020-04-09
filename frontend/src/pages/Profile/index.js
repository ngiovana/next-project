import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMenu, FiTrash2, FiEdit } from 'react-icons/fi';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [activity, setActivity] = useState([]);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const percentage = (activity.filter(activity => activity.ended == "true").length/activity.length * 100).toFixed(2);
  const history = useHistory();

  const projectId = localStorage.getItem('projectId');
  const projectTitle = localStorage.getItem('projectTitle');
  const projectInitialdate = localStorage.getItem('projectInitialdate');
  const projectFinaldate = localStorage.getItem('projectFinaldate');

  var contLateActivity = 0;
  for (var i = 0; i < activity.length; i++) {
    if (activity[i].enddate > projectFinaldate) {
      contLateActivity++;
    }
  }

  useEffect(() => {
    api.get('/profile', {
      headers: { Authorization: projectId,}
    }).then(response => {
      setActivity(response.data);
    })
  }, [projectId]);

  function handleEditActivity(e) {
    localStorage.setItem('activityId', e.id);
    localStorage.setItem('activityName', e.name);
    localStorage.setItem('activityInitdate', e.initdate);
    localStorage.setItem('activityEnddate', e.enddate);

    history.push(`/activity/edit/${e.id}`);
  }

  function handleEditProject() {
    history.push(`/projects/edit/${projectId}`);
  }

  async function handleDeleteActivity(id) {
    try{
      await api.delete(`activity/${id}`, {
        headers: { Authorization: projectId,}
      });

      setActivity(activity.filter(activity => activity.id !== id));
    }
    catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  async function handleDeleteProject() {
    try{
      await api.delete(`projects/${projectId}`);

      handleLogout();
    }
    catch (err) {
      alert('Erro ao deletar projeto, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <span>{projectTitle}</span>
        
        <Link className="button" to="/activity/new">Cadastrar nova atividade</Link>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
          <DropdownToggle style={{backgroundColor: '#F8F8FF', borderWidth: '2px'}} title="Menu" caret>
            <FiMenu size={18} color="#DAA520" />
          </DropdownToggle>
          { 
          dropdownOpen ? (
          <DropdownMenu>
            <DropdownItem style={{backgroundColor: '#F8F8FF', borderWidth: '2px', width: '110px'}} className="drop-item" title="Edit" onClick={handleEditProject}>Editar projeto</DropdownItem>
            <DropdownItem style={{backgroundColor: '#F8F8FF', borderWidth: '2px', width: '110px'}} className="drop-item" title="Delete" onClick={handleDeleteProject}>Excluir projeto</DropdownItem>
            <DropdownItem style={{backgroundColor: '#F8F8FF', borderWidth: '2px', width: '110px'}} className="drop-item" title="Logout" onClick={handleLogout}>Sair do projeto</DropdownItem>
          </DropdownMenu>
          ) :
          null
        }
        </ButtonDropdown>
      </header>

      <section>
        <p>ID do Projeto: {projectId}</p> 
        <p>Data inicial: {projectInitialdate.split('-').reverse().join('-')} &nbsp; 
        Data final: {projectFinaldate.split('-').reverse().join('-')}</p>   
        <p>Projeto {isNaN(percentage) ? 0 : percentage}% concluído &nbsp;
        Atrasado: {(contLateActivity > 0) ? "Sim" : "Não"} </p>
      </section>
      
      <h1>Atividades Cadastradas</h1>
      <ul>
        {activity.map(activity => (
          <li key={activity.id}>
          <strong>ATIVIDADE:</strong>
          <p>{activity.name}</p>

          <strong>DATA INICIAL:</strong>
          <p>{activity.initdate.split('-').reverse().join('-')}</p>

          <strong>DATA FINAL:</strong>
          <p>{activity.enddate.split('-').reverse().join('-')}</p>

          <strong>FINALIZADA?</strong>
          <p>{(activity.ended == "true") ? "Sim" : "Não" }</p>

          <button title="Editar" onClick={() => handleEditActivity(activity)} type="button" className="edit-icon">
            <FiEdit size={20} color="#DAA520"/>
          </button>

          <button title="Excluir" onClick={() => handleDeleteActivity(activity.id)} type="button">
            <FiTrash2 size={20} color="#DAA520"/>
          </button>
        </li>
        ))}
      </ul>
    </div>

  );
}