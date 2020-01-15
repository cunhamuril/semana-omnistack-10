import React from 'react';

import api from '../../services/api'

import './styles.css';

function DevItem({ dev, loadDevs, setDevId }) {
  async function handleRemoveDev(id) {
    await api.delete(`/devs/${id}`)

    loadDevs()
  }

  return (
    <li className="dev-item">
      <div className="action-btns">
        <button
          className="btn-edit"
          title="Editar"
          onClick={() => setDevId(dev._id)} // passa ID por props
        >
          <i className="fas fa-pen" />
        </button>
        <button
          className="btn-delete"
          title="Excluir"
          onClick={() => handleRemoveDev(dev._id)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>

      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>

      <p>{dev.bio}</p>
      <a
        href={`https://github.com/${dev.github_username}`}
        target="_blank"
        rel="noopener noreferrer"
      >Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;