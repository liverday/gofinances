# <h1 align="center">![Go Finances](.github/logo.svg)</h1>

<h3 align="center">
    💰 Um jeito novo de controlar suas finanças
</h3>

GoFinances é uma aplicação Mobile/Web com o objetivo de controlar suas finanças (eu preciso muito disso), permitindo que você cadastre entradas, saídas e categorize-as de uma forma organizada!

## 🚀 Tecnologias utilizadas

#### Frontend
- React
    - React Icons
    - React Router DOM
    - React Native
- Styled Components
- Typescript
- Axios
- Date-FNS
- Jest


#### Backend
- NodeJS
- Express
- Docker
- Postgres
- TypeORM
- Jest
- Supertest

## 💻 Rodando a aplicação

#### Requisitos

- NodeJS
- Yarn
- Uma instância de Postgres ([Docker](https://hub.docker.com/_/postgres))

**Clone o repositório**

```sh
git clone git@github.com:liverday/gofinances.git
```

**Instale as dependencias**

```sh
cd <frontend ou backend>

yarn
```

**Inicie o processo**

#### Frontend

```sh
cd frontend

yarn start
```

#### Backend

**Certifique-se de que o container do Postgres esteja rodando**

```sh
docker run --name gofinances-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=p0stgres -e POSTGRES_DB=gofinances -p 5432:5432 -d postgres
```

**Rode as migrations**

```sh
cd backend

yarn typeorm migration:run
```

**Inicie o processo**

```sh
yarn dev:server
```

Feito com :heart: por Vitor Medeiro. 🤝 Entre em [contato](https://www.linkedin.com/in/vitor-medeiro-9096ab138) 