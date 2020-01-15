import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import './styles.css'

function DevForm({ onSubmit, id }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Pegar localização atual
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      err => {
        console.error(err)
      },
      {
        timeout: 30000,
      })
  }, []);

  useEffect(() => {
    loadDevOnForm()
    //eslint-disable-next-line
  }, [id]);

  // Função responsável por listar dados do dev e preencher o form
  async function loadDevOnForm() {
    if (id) {
      const response = await api.get(`/devs/${id}`)

      const { github_username, techs } = response.data

      setGithubUsername(github_username)
      setTechs(techs.join(', '))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Enviando info por props
    if (!id) {
      await onSubmit({
        github_username: githubUsername,
        techs,
        latitude,
        longitude
      })
    } else {
      await onSubmit({
        github_username: githubUsername,
        techs,
        latitude,
        longitude
      }, id)
    }

    setGithubUsername('')
    setTechs('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          type="text"
          ame="github_username"
          id="github_username"
          value={githubUsername}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
    </form>
  )
}

export default DevForm
