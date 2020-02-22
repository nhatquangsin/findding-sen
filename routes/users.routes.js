import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserMiddleware from "../middleware/user.middlewares";

const router = new Router();

router.get("/users", (req, res) => {
  UserController.getAll(req, res);
});

router.get("/users/:id", (req, res) => {
  UserController.getUser(req, res);
});

router.post("/users/signin", (req, res) => {
  UserController.signin(req, res);
});

router.post("/users", UserMiddleware.checkToken, (req, res) => {
  UserController.addUser(req, res);
});

router.put("/users/:id", UserMiddleware.checkToken, (req, res) => {
  UserController.updateUser(req, res);
});

router.delete("/users/:id", UserMiddleware.checkToken, (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
