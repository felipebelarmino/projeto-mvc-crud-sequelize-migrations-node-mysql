import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return response.json({ message: "GET" });
});

export default routes;
