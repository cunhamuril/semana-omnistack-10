# Semana Omnistack 10 - DevRadar App

Desenvolvimento de App mapa de developers
com NodeJS, ReactJS e React Native

## Funcionalidades
- Registrar devs com dados do GitHub
- Listar devs
- Buscar por devs por tecnologias de uma distância em um raio de 50 km

## Ferramentas utilizadas
#### Backend
- NodeJS V8
- MongoDB
- Express
- Mongoose
- Axios

#### Frontend
- ReactJS

#### Mobile
- React Native

## REST endpoints
#### /devs
  **- Método:** GET
  **- Função:** Listar todos os desenvolvedores registrados

#### /devs
  **- Método:** POST
  **- Requisição:** Body
  **- Função:** Registrar desenvolvedor utilizando dados do GitHub

#### /search
  **- Método:** GET
  **- Requisição:** Query
  **- Função:** Buscar todos os desenvolvedores registrados filtrando por tecnologias e localização (distância em um raio de 50 km)

### Development
- Em `backend/` executar `yarn` para instalar as dependências e executar `yarn start`. Servidor deverá rodar em `http://localhost:3333`