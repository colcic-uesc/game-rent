import jwt from "jsonwebtoken";
import { promisify } from "util";

// Blacklist em memória
const tokenBlacklist = new Set();

// Middleware de autenticação
export default async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
   }

   const [, token] = authHeader.split(" ");

   if (tokenBlacklist.has(token)) {
      return res
         .status(401)
         .json({ message: "Token inválido (usuário deslogado)" });
   }

   try {
      const decoded = await promisify(jwt.verify)(
         token,
         process.env.APP_SECRET
      );
HEAD

      req.user = {
         id: decoded.id,
         role: decoded.role,
         active: decoded.active,
      };

      req.user = {
         id: decoded.id,
         role: decoded.role,
         active: decoded.active
       };
f99934d (atualizações backend/Aluguéis)

      return next();
   } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token inválido" });
   }
};

HEAD
// Rota de logout
export const logout = (req, res) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(400).json({ message: "Token não fornecido" });
   }

   const [, token] = authHeader.split(" ");
   tokenBlacklist.add(token);

   return res.status(200).json({ message: "Logout realizado com sucesso" });
};

// Middlewares de acesso
export const isUserActive = (req, res, next) => {
   const user = req.user;

   if (!user || !user.active) {
      return res
         .status(403)
         .json({ error: "Apenas clientes ativos podem registrar aluguéis." });
   }

   next();
};

export const isAdmin = (req, res, next) => {
   const user = req.user;

   if (!user || user.role !== "admin") {
      return res
         .status(403)
         .json({ error: "Apenas administradores têm acesso a esta operação." });
   }

   next();
};

export const isClientActive = (req, res, next) => {
   const user = req.user;
   if (!user || user.role !== 'cliente' || !user.active) {
     return res.status(403).json({ error: 'Apenas clientes ativos podem registrar aluguéis.' });
   }
   next();
 };

 export const isAdmin = (req, res, next) => {
   const user = req.user;
   if (!user || user.role !== 'admin') {
     return res.status(403).json({ error: 'Apenas administradores têm acesso a esta operação.' });
   }
   next();
 };
f99934d (atualizações backend/Aluguéis)
