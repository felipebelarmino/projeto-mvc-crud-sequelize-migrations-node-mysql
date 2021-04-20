import User from "../models/User";

class UserController {
  // store é um middleware para salvar os dados que vem do body
  async store(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    // se existir, vou devolver uma mensagem de erro
    if (userExists) {
      return response.status(400).json({ error: "Usuário já existe!" });
    }

    const { id, name, email, provider } = await User.create(request.body); // aqui eu poderia fazer a destruturação e pegar dados por dados, mas a minha model já está tratando isso

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
