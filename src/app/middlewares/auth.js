import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
   }

   const [, token] = authHeader.split(" ");

   try {
      const decoded = await promisify(jwt.verify)(
         token,
         process.env.APP_SECRET
      );
      req.user = {
         id: decoded.id,
         role: decoded.role,
         active: decoded.active
       };

      return next();
   } catch (err) {
      return res.status(401).json({ message: "Token invalid" });
   }
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
