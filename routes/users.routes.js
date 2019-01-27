import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = new Router();

router.get("/users", (req, res) => {
  UserController.getAll(req, res);
});

router.get("/users/:id", (req, res) => {
  UserController.getUser(req, res);
});

router.post("/users", (req, res) => {
  UserController.addUser(req, res);
});

router.put("/users/:id", (req, res) => {
  UserController.updateUser(req, res);
});

router.delete("/users/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
