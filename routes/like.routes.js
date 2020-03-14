import { Router } from "express";
import LikeController from "../controllers/Like.controller";

const router = new Router();

router.get("/likes/:postId", (req, res) => {
    LikeController.getLikesOfPost(req, res);
});

router.get("/likes", (req, res) => {
    LikeController.getAll(req, res);
});

router.post("/likes", (req, res) => {
    LikeController.addLike(req, res);
});

router.post("/likes/delete", (req, res) => {
    LikeController.deleteLike(req, res);
});

export default router;
