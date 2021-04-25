import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      login: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({
        yup: await schema.isValid(request.body),
        request: request.body,
      });
    }

    const userExists = await User.findOne({
      where: { login: request.body.login },
    });

    if (userExists) {
      return response.status(400).json({ error: "Usuário já existe!" });
    }

    const { id, name, login, provider } = await User.create(request.body);

    return response.json({
      id,
      name,
      login,
      provider,
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      login: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) => {
          oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when("password", (password, field) => {
        password ? field.required().oneOf([Yup.ref("password")]) : field;
      }),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ erro: "Falha ao validar campos!" });
    }

    console.log(request.userId);

    const { login, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (login && login !== user.login) {
      const userExists = await User.findOne({ where: { login } });

      if (userExists) {
        return response.status(400).json({ erro: "Usuário já existe!" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(400).json({ erro: "Senha não corresponde" });
    }

    const { name, provider } = await user.update(request.body);

    return response.json({
      mensagem: "Usuário alterado com sucesso para o seguinte:",
      usuario: {
        name,
        login,
        provider,
      },
    });
  }
}

export default new UserController();
