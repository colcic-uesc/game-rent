import * as Yup from "yup";
import jwt from "jsonwebtoken";

import User from "../models/User";

class SessionsController {
   async create(req, res) {
      const schema = Yup.object().shape({
         email: Yup.string().required("Nome é obrigatório"),
         password: Yup.string().required("Senha é obrigatória"),
      });

      if (!(await schema.validate(req.body))) {
         return res.status(400).json({
            error: "Erro de validação das credenciais",
         });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(404).json({ error: "Usuario não encontrado" });
      }

      if (!user.is_active) {
         return res.status(401).json({ error: "Usuario inativo" });
      }

      if (!(await user.checkPassword(password))) {
         return res.status(401).json({ error: "Senha não confere" });
      }

      const { id, name, tipo, is_active } = user;

      const token = jwt.sign(
         { id, role: tipo, active: is_active },
         process.env.APP_SECRET,
         {
            expiresIn: "1d",
         }
      );

      return res.json({
         user: {
            id,
            name,
            email,
         },
         token,
      });
   }
}

export default new SessionsController();
