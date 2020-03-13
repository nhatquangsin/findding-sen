import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = new Router();

router.get("/posts", (req, res) => {
  PostController.getAll(req, res);
});

router.get("/posts/:id", (req, res) => {
  PostController.getPost(req, res);
});

router.get("/posts/:id/sen", (req, res) => {
  PostController.getSenByPostId(req, res);
});

router.post("/posts", (req, res) => {
  PostController.addPost(req, res);
});

router.post("/posts/:id/update", (req, res) => {
  PostController.updatePost(req, res);
});

router.post("/posts/:id/delete", (req, res) => {
  PostController.deletePost(req, res);
});

router.post("/posts/delete", (req, res) => {
  PostController.deleteAllPost(req, res);
});

export default router;
