import jwt from "jsonwebtoken";
import User from "../Models/User";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
  }
}

export default new SessionController();
