import jwt from "jsonwebtoken";
import User from "../models/User";

class SessionsController {
   async create(req, res) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }

      if (!(await user.checkPassword(password))) {
         return res.status(401).json({ error: "Password does not match" });
      }

      const { id, name } = user;

      const token = jwt.sign({ id }, process.env.APP_SECRET, {
         expiresIn: "7d",
      });

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
