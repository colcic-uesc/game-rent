
<div align="center">
  <img src="https://github.com/cmoliv/game-rent/blob/main/documentation/images/game-verse-logo.png" alt="Game verse logo" title="Game verse logo" />
</div>

# Game Verse API

O **GameVerse** é um sistema de aluguel de jogos desenvolvido em Node.js, como projeto avaliativo para a disciplina **Programação para Aplicações Web** ministrada pelo prof. Helder Almeida.

## Pré-requisitos

- [Node v22](https://nodejs.org/en/download)
- [MySQL 8.x](https://dev.mysql.com/downloads/installer/)

## Funcionalidades

- [X] Cadastro e autenticação
- [X] Níveis de acesso básicos (admin e cliente)
- [X] Gerenciamento de usuários
- [X] Gerenciamento de plataformas
- [X] Gerenciamento de gêneros
- [X] Gerenciamento de jogos para aluguel
- [X] Gerenciamento de registros de aluguel
- [X] Gerenciamento de pagamentos


## Tech Stack

- NodeJS 
- Express
- SequelizeORM
- MySQL
- Swagger
- Yup & Youch


## Rodando localmente

Clone o projeto na sua máquina

```bash
  git clone git@github.com:cmoliv/game-rent.git
```

Vá até o diretório do projeto

```bash
  cd game-rent
```

Instale as dependências

```bash
  npm install
```

Crie uma cópia do .env-example

```
cp .env-example .env
```

Preencha as variáveis de ambiente

```yml
NODE_ENV=development
PORT=5000

# Auth

APP_SECRET=

# Database

DB_HOST=localhost
DB_USER=root
DB_PASS=secret
DB_NAME=develop # Nome do banco de dados que você criou

# Email
API_EMAIL_HOST=smtp.example.com
API_EMAIL_PORT=587
API_EMAIL_USER=user
API_EMAIL_PASS=pass
```

Rode as migrações para preencher o banco de dados com as tabelas necessárias

```bash
npx sequelize-cli db:migrate
```

(Opcional) Rode o seeder para preencher o banco de dados com algumas informações

```bash
npx sequelize-cli db:seed:all
```

Inicie o servidor

```bash
  npm run dev
```


## Authors

<!-- - [@octokatherine](https://www.github.com/octokatherine) -->
| [<img src="https://avatars0.githubusercontent.com/u/27397817?s=115&v=3" width=100><br><sub>@cmoliv</sub>](https://github.com/christianmoliveira) | [<img src="https://avatars.githubusercontent.com/u/105596151?v=4&s=115"  width=100><br><sub>@IgorCamps</sub>](https://github.com/brenu) | [<img src="https://avatars.githubusercontent.com/u/127159587?v=4" width=100><br><sub>@rafinhaaaaXD</sub>](https://github.com/ariel-narciso) | [<img src="https://avatars.githubusercontent.com/u/145926184?v=4" width=100><br><sub>@paollagiselle</sub>](https://github.com/nozinho) | [<img src="https://avatars.githubusercontent.com/u/182822448?v=4" width=100><br><sub>@Mathz0</sub>](https://github.com/christianmoliveira) |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |


## License

[MIT](https://github.com/cmoliv/game-rent/blob/main/LICENSE)
