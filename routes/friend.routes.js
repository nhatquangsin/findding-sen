import { Router } from "express";
import FriendController from "../controllers/friend.controller";

const router = new Router();

router.get("/friends/:userId", (req, res) => {
    FriendController.getFriendsOfUser(req, res);
});

router.post("/friends", (req, res) => {
    FriendController.addFriend(req, res);
});

router.post("/friends/delete", (req, res) => {
});

export default router;
