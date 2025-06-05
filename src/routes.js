import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import auth from "./app/middlewares/auth";

import HomeController from "./app/controllers/HomeController";
import RentController from "./app/controllers/RentController";
import UsersController from "./app/controllers/UsersController";
import GamesController from "./app/controllers/GamesController";
import GenresController from "./app/controllers/GenresController";
import SessionsController from "./app/controllers/SessionsController";
import PlatformsController from "./app/controllers/PlatformsController";
import auth, { isClientActive, isAdmin } from './app/middlewares/auth';
import auth, { logout } from "./app/middlewares/auth";

const routes = Router();
const upload = multer(multerConfig);

/**
 * @swagger
 * tags:
 *   - name: Home
 *     description: Rota de boas-vindas
 *   - name: Auth
 *     description: Operações relacionadas ao cadastro e autenticação do usuário (login)
 *   - name: Users
 *     description: Operações relacionadas aos usuários
 *   - name: Platforms
 *     description: Operações relacionadas às plataformas
 *   - name: Genres
 *     description: Operações relacionadas aos gêneros
 *   - name: Games
 *     description: Operações relacionadas aos jogos
 *   - name: Rents
 *     description: Operações relacionadas aos alugueis de jogos
 */

// Home
/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota inicial da API
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
routes.get("/", HomeController.index);

// Auth
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Cria uma nova sessão de usuário (login)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Sessão criada com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
routes.post("/login", SessionsController.create);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Cria uma nova conta de usuário (cadastro)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - tipo
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               tipo:
 *                 type: string
 *                 enum: [admin, cliente]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Conta criada com sucesso
 *       400:
 *         description: Erro de validação ou usuário já existe
 */
routes.post("/signup", UsersController.store);

// Users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - tipo
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               tipo:
 *                type: string
 *                example: cliente
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação ou usuário já existe
 */
routes.get("/api/users", auth, UsersController.index);
routes.post("/api/users", auth, UsersController.store);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna os dados de um usuário específico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário encontrados
 *       404:
 *         description: Usuário não encontrado
 */
routes.get("/api/users/:id", auth, UsersController.show);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na validação
 *       404:
 *         description: Usuário não encontrado
 */
routes.put("/api/users/:id", auth, UsersController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Desativa (soft delete) um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.delete("/api/users/:id", auth, UsersController.destroy);

/**
 * @swagger
 * /api/users/{id}/history:
 *   get:
 *     summary: Retorna o histórico de aluguéis do usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de aluguéis com jogo e plataforma
 *       404:
 *         description: Usuário ou histórico não encontrado
 */
routes.get("/api/users/:id/history", auth, UsersController.history);

// Platforms
/**
 * @swagger
 * /api/platforms:
 *   get:
 *     summary: Lista todas as plataformas
 *     tags: [Platforms]
 *     responses:
 *       200:
 *         description: Lista de plataformas
 *   post:
 *     summary: Cria uma nova plataforma
 *     tags: [Platforms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Xbox Series
 *     responses:
 *       201:
 *         description: Plataforma criada com sucesso
 *       400:
 *         description: Erro de validação ou plataforma já existe
 */
routes.get("/api/platforms", auth, PlatformsController.index);
routes.post("/api/platforms", auth, PlatformsController.create);

/**
 * @swagger
 * /api/platforms/{id}:
 *   get:
 *     summary: Retorna uma plataforma específica
 *     tags: [Platforms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da plataforma
 *       404:
 *         description: Plataforma não encontrada
 *   put:
 *     summary: Atualiza uma plataforma
 *     tags: [Platforms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Xbox Series
 *     responses:
 *       200:
 *         description: Plataforma atualizada com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Plataforma não encontrada
 *   delete:
 *     summary: Remove uma plataforma
 *     tags: [Platforms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Plataforma deletada com sucesso
 *       404:
 *         description: Plataforma não encontrada
 */
routes.get("/api/platforms/:id", auth, PlatformsController.show);
routes.put("/api/platforms/:id", auth, PlatformsController.update);
routes.delete("/api/platforms/:id", auth, PlatformsController.destroy);

// Genres
/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Lista todas os gêneros
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Lista de gêneros
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: FPS
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 *       400:
 *        description: Erro de validação ou gênero já existe
 */
routes.get("/api/genres", auth, GenresController.index);
routes.post("/api/genres", auth, GenresController.create);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Retorna um gênero específico
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do gênero
 *       404:
 *         description: Gênero não encontrado
 *   put:
 *     summary: Atualiza um gênero
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Steam
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Gênero não encontrado
 *   delete:
 *     summary: Remove um gênero
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Gênero deletado com sucesso
 *       404:
 *          description: Gênero não encontrado
 */
routes.get("/api/genres/:id", auth, GenresController.show);
routes.put("/api/genres/:id", auth, GenresController.update);
routes.delete("/api/genres/:id", auth, GenresController.destroy);

// Games
/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Lista todas os jogos
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Lista de jogos
 *   post:
 *     summary: Cria um novo jogo
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - status
 *               - yt_link
 *               - capa_jogo
 *               - platform_id
 *               - genre_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Call of Duty
 *               description:
 *                 type: string
 *                 example: Jogo de tiro em primeira pessoa
 *               price:
 *                 type: number
 *                 example: 59.99
 *               status:
 *                 type: string
 *                 example: available
 *               yt_link:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=example
 *               capa_jogo:
 *                 type: string
 *                 format: binary
 *               platform_id:
 *                 type: number
 *                 example: 1
 *               genre_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *       400:
 *         description: Erro de validação ou jogo já cadastrado
 */
routes.get("/api/games", auth, GamesController.index);
routes.post(
   "/api/games",
   auth,
   upload.single("capa_jogo"),
   GamesController.create
);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Retorna um jogo específico
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do jogo
 *       404:
 *         description: Jogo não encontrado
 *   put:
 *     summary: Atualiza um jogo
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - status
 *               - yt_link
 *               - capa_jogo
 *               - platform_id
 *               - genre_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Call of Duty
 *               description:
 *                 type: string
 *                 example: Jogo de tiro em primeira pessoa
 *               price:
 *                 type: number
 *                 example: 59.99
 *               status:
 *                 type: string
 *                 example: available
 *               yt_link:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=example
 *               capa_jogo:
 *                 type: string
 *                 format: binary
 *               platform_id:
 *                 type: number
 *                 example: 1
 *               genre_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Jogo não encontrado
 *   delete:
 *     summary: Remove um jogo
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Jogo deletado com sucesso
 *       404:
 *         description: Jogo não encontrado
 */
routes.get("/api/games/:id", auth, GamesController.show);
routes.put(
   "/api/games/:id",
   upload.single("capa_jogo"),
   auth,
   GamesController.update
);
routes.delete("/api/games/:id", GamesController.destroy);

// Rents
/**
 * @swagger
 * /api/rents:
 *   get:
 *     summary: Lista todos aos alugueis realizados
 *     tags: [Rents]
 *     responses:
 *       200:
 *         description: Lista de alugueis
 *   post:
 *     summary: Registra um novo aluguel
 *     tags: [Rents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - jogo_ids
 *             properties:
 *               id_usuario:
 *                 type: number
 *               jogo_ids:
 *                 type: array
 *     responses:
 *       201:
 *         description: Aluguel registrado com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
routes.get("/api/rents", auth,isAdmin, RentController.index);
routes.post("/api/rents", auth,isClientActive, RentController.create);


/**
 * @swagger
 * /api/rents/{id}:
 *   get:
 *     summary: Retorna um registro de aluguel específico
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informações do aluguel
 *       404:
 *         description: Registro de aluguel não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualiza um registro de aluguel
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Aluguel atualizado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Registro de aluguel não encontrado
 */
routes.get("/api/rents/:id", auth,isAdmin, RentController.show);
routes.put("/api/rents/:id", auth,isAdmin, RentController.update);

routes.post("/logout", logout);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Encerra a sessão do usuário (logout)
 *     tags: [Logout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       400:
 *         description: Token não fornecido
 *       401:
 *         description: Token inválido
 */


export default routes;
