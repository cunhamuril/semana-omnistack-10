# Semana OmniStack 10 - DevRadar App
Aplicação que registra devs e busca por devs por perto do usuário.

## Funcionalidades
- Registrar devs com dados do GitHub
- Listar devs
- Buscar por devs de uma distância em um raio de 50km filtrando por tecnologias

## Ferramentas utilizadas
### Backend
- NodeJS V8
- MongoDB
- Express
- Mongoose
- Axios
- CORS

### Frontend
- ReactJS
- Axios

### Mobile
- React Native

## REST endpoints
#### /devs
  - **Método:** GET
  - **Função:** Listar todos os desenvolvedores registrados

#### /devs
  - **Método:** POST
  - **Requisição:** Body
  - **Função:** Registrar desenvolvedor utilizando dados do GitHub

#### /devs/:id
  - **Método:** PUT
  - **Requisição:** Body, Param
  - **Função:** Atualizar registro do desenvolvedor

#### /devs/:id
  - **Método:** DELETE
  - **Requisição:** Param
  - **Função:** Deletar registro do desenvolvedor

#### /search
  - **Método:** GET
  - **Requisição:** Query
  - **Função:** Buscar todos os desenvolvedores registrados filtrando por tecnologias e localização (distância em um raio de 50 km)

### Development
- Em `backend/` executar `yarn` para instalar as dependências e executar `yarn start`. Servidor deverá rodar em `http://localhost:3333`

- Em `frontend/` executar `yarn` para instalar as dependências e executar `yarn start`. Servidor deverá rodar em `http://localhost:3000`