import React, { useEffect, useState } from 'react';

import api from './services/api'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([]);
  const [id, setId] = useState(null);

  // Listar devs
  useEffect(() => {
    loadDevs()
  }, [])

  async function loadDevs() {
    const response = await api.get('/devs')

    setDevs(response.data)
  }

  async function handleAddDev(data, id) {
    if (!id) {
      await api.post('/devs', data)
    } else {
      await api.put(`/devs/${id}`, data)
      setId(null)
    }
    loadDevs()
  }

  function setDevId(id) {
    setId(id)
  }

  return (
    <div className="App">
      <aside>
        <strong>{id ? "Alterar Cadastro" : "Cadastrar"}</strong>
        <DevForm onSubmit={handleAddDev} id={id} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              loadDevs={loadDevs}
              setDevId={setDevId}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
