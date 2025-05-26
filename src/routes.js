import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import HomeController from "./app/controllers/HomeController";
import UsersController from "./app/controllers/UsersController";
import GamesController from "./app/controllers/GamesController";
import GenresController from "./app/controllers/GenresController";
import PlatformsController from "./app/controllers/PlatformsController";

const routes = Router();
const upload = multer(multerConfig);

/**
 * @swagger
 * tags:
 *   - name: Home
 *     description: Rota de boas-vindas
 *   - name: Platforms
 *     description: Operações relacionadas às plataformas
 *   - name: Genres
 *     description: Operações relacionadas aos gêneros
 *   - name: Games
 *     description: Operações relacionadas aos jogos
 *   - name: Users
 *     description: Operações relacionadas aos usuários
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação ou usuário já existe
 */
routes.get("/api/users", UsersController.index);
routes.post("/api/users", UsersController.store);

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
routes.get("/api/users/:id", UsersController.show);

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
 *               password:
 *                 type: string
 *               oldPassword:
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
routes.put("/api/users/:id", UsersController.update);

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
 *       200:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.delete("/api/users/:id", UsersController.destroy);

/**
 * @swagger
 * /api/users/{id}/historico:
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
routes.get("/api/users/:id/history", UsersController.history);

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
routes.get("/api/platforms", PlatformsController.index);
routes.post("/api/platforms", PlatformsController.create);

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
routes.get("/api/platforms/:id", PlatformsController.show);
routes.put("/api/platforms/:id", PlatformsController.update);
routes.delete("/api/platforms/:id", PlatformsController.destroy);

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
routes.get("/api/genres", GenresController.index);
routes.post("/api/genres", GenresController.create);

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
routes.get("/api/genres/:id", GenresController.show);
routes.put("/api/genres/:id", GenresController.update);
routes.delete("/api/genres/:id", GenresController.destroy);

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
routes.get("/api/games", GamesController.index);
routes.post("/api/games", upload.single("capa_jogo"), GamesController.create);

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
routes.get("/api/games/:id", GamesController.show);
routes.put(
   "/api/games/:id",
   upload.single("capa_jogo"),
   GamesController.update
);
routes.delete("/api/games/:id", GamesController.destroy);

export default routes;
