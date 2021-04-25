import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    return response.status(401).json({ erro: "Token não fornecido!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    request.userId = decoded.id;

    return next();

  } catch (error) {
    return response.status(401).json({ erro: "Token inválido!" });
  }
};
