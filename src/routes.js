import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import auth, { isUserActive, isAdmin, logout } from "./app/middlewares/auth";

import HomeController from "./app/controllers/HomeController";
import RentController from "./app/controllers/RentController";
import UsersController from "./app/controllers/UsersController";
import GamesController from "./app/controllers/GamesController";
import GenresController from "./app/controllers/GenresController";
import SessionsController from "./app/controllers/SessionsController";
import PaymentsController from "./app/controllers/PaymentsController";
import PlatformsController from "./app/controllers/PlatformsController";

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
 *   - name: Payments
 *     description: Operações relacionadas a pagamentos
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
 * /api/login:
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
routes.post("/api/login", SessionsController.create);

/**
 * @swagger
 * /api/signup:
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
routes.post("/api/signup", UsersController.store);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Encerra a sessão do usuário (logout)
 *     tags: [Auth]
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
routes.post("/api/logout", auth, logout);

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
routes.get("/api/users", auth, isUserActive, isAdmin, UsersController.index);
routes.post("/api/users", auth, isUserActive, isAdmin, UsersController.store);

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
routes.get("/api/users/:id", auth, isUserActive, UsersController.show);

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
 *         description: ID do usuário a ser atualizado
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
 *                 format: email
 *               oldPassword:
 *                 type: string
 *                 minLength: 8
 *               password:
 *                 type: string
 *                 minLength: 8
 *               passwordConfirmation:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Senha atual incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.put("/api/users/:id", auth, isUserActive, UsersController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Desativa um usuário (soft delete)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser desativado
 *     responses:
 *       204:
 *         description: Usuário desativado com sucesso
 *       400:
 *         description: Usuário já desativado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete("/api/users/:id", auth, isUserActive, UsersController.destroy);

/**
 * @swagger
 * /api/users/{id}/activate:
 *   put:
 *     summary: Reativa um usuário desativado
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser reativado
 *     responses:
 *       200:
 *         description: Usuário reativado com sucesso
 *       400:
 *         description: Usuário já ativo
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.put(
  "/api/users/:id/activate",
  auth,
  isUserActive,
  isAdmin,
  UsersController.activate
);

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
routes.get(
  "/api/users/:id/history",
  auth,
  isUserActive,
  UsersController.history
);

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
routes.get(
  "/api/platforms",
  auth,
  isUserActive,
  isAdmin,
  PlatformsController.index
);
routes.post(
  "/api/platforms",
  auth,
  isUserActive,
  isAdmin,
  PlatformsController.create
);

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
routes.get(
  "/api/platforms/:id",
  auth,
  isUserActive,
  isAdmin,
  PlatformsController.show
);
routes.put(
  "/api/platforms/:id",
  auth,
  isUserActive,
  isAdmin,
  PlatformsController.update
);
routes.delete(
  "/api/platforms/:id",
  auth,
  isUserActive,
  isAdmin,
  PlatformsController.destroy
);

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
routes.get("/api/genres", auth, isUserActive, isAdmin, GenresController.index);
routes.post(
  "/api/genres",
  auth,
  isUserActive,
  isAdmin,
  GenresController.create
);

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
routes.get(
  "/api/genres/:id",
  auth,
  isUserActive,
  isAdmin,
  GenresController.show
);
routes.put(
  "/api/genres/:id",
  auth,
  isUserActive,
  isAdmin,
  GenresController.update
);
routes.delete(
  "/api/genres/:id",
  auth,
  isUserActive,
  isAdmin,
  GenresController.destroy
);

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
routes.get("/api/games", auth, isUserActive, GamesController.index);
routes.post(
  "/api/games",
  auth,
  isUserActive,
  isAdmin,
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
routes.get("/api/games/:id", auth, isUserActive, GamesController.show);
routes.put(
  "/api/games/:id",
  upload.single("capa_jogo"),
  auth,
  isUserActive,
  isAdmin,
  GamesController.update
);
routes.delete(
  "/api/games/:id",
  auth,
  isUserActive,
  isAdmin,
  GamesController.destroy
);

// Payments
/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Lista todos os pagamentos
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 *
 */
routes.get(
  "/api/payments",
  auth,
  isUserActive,
  isAdmin,
  PaymentsController.index
);

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Registra um novo pagamento
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_aluguel
 *               - valor
 *               - metodo
 *               - status
 *             properties:
 *               id_aluguel:
 *                 type: number
 *                 example: 1
 *               valor:
 *                 type: number
 *               metodo:
 *                 type: string
 *                 enum: [pix, cartao, boleto, transferencia]
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *       400:
 *         description: Erro ao criar pagamento
 */
routes.post("/api/payments", auth, isUserActive, PaymentsController.create);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Retorna um pagamento pelo ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *       404:
 *         description: Pagamento não encontrado
 *
 */
routes.get("/api/payments/:id", auth, isUserActive, PaymentsController.show);

/**
 * @swagger
 * /api/payments/{paymentId}/pay:
 *   put:
 *     summary: Envia um e-mail de simulação de pagamento
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: pagamentoId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do pagamento a ser simulado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [aprovado, pendente, recusado]
 *     responses:
 *       200:
 *         description: Pagamento atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ausentes
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro ao enviar e-mail
 */
routes.put(
  "/api/payments/:paymentId/pay",
  auth,
  isUserActive,
  isAdmin,
  PaymentsController.update
);

// Rents
/**
 * @swagger
 * /api/rents:
 *   get:
 *     summary: Lista todos os aluguéis (para admin) ou os aluguéis do usuário logado (para cliente)
 *     tags: [Rents]
 *     responses:
 *       200:
 *         description: Lista de aluguéis
 *   post:
 *      summary: Registra um novo aluguel
 *      tags: [Rents]
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                schema:
 *                type: object
 *                required:
 *                   - id_usuario
 *                   - jogo_ids
 *                properties:
 *                   id_usuario:
 *                      type: number
 *                   jogo_ids:
 *                      type: array
 *      responses:
 *        201:
 *          description: Aluguel registrado com sucesso
 *        400:
 *          description: Erro de validação
 *        500:
 *          description: Erro interno do servidor
 */
routes.get("/api/rents", auth, isUserActive, RentController.index);
routes.post("/api/rents", auth, isUserActive, RentController.create);

/**
 * @swagger
 * /api/rents/{id}:
 *    get:
 *       summary: Retorna um registro de aluguel específico
 *       tags: [Rents]
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *         200:
 *           description: Informações do aluguel
 *         404:
 *           description: Registro de aluguel não encontrado
 *         500:
 *           description: Erro interno do servidor
 *    put:
 *       summary: Atualiza um registro de aluguel (agora para finalizar)
 *       tags: [Rents]
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: number
 *       responses:
 *         200:
 *           description: Aluguel atualizado com sucesso
 *         400:
 *           description: Erro na validação dos dados
 *         404:
 *           description: Registro de aluguel não encontrado
 */
routes.get("/api/rents/:id", auth, isUserActive, RentController.show);
routes.patch(
  "/api/rents/:id/finalize",
  auth,
  isUserActive,
  RentController.update
);

export default routes;
