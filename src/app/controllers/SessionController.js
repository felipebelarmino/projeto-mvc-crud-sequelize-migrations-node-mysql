import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    const { login, password } = request.body;
    const user = await User.findOne({ where: { login } });

    if (!user) {
      return response.status(401).json({ error: "Usuário não existe" });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "Senha não confere" });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        login,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

