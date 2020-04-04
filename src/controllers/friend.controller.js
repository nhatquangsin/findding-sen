import {ADD_FRIEND_ERROR, ADD_FRIEND_SUCCESS, GET_ALL_SUCCESS} from "../messages/friend.message";
import Friend from "../models/friend";
import {findFriendsOfUser} from "../services/friend.service";
import UserService from "../services/user.service";

const FriendController = {};

FriendController.getFriendsOfUser = async (req, res) => {
    const friendIds = await findFriendsOfUser(req.params.userId);
    let friends = [];
    for (const id of friendIds) {
        const user = await UserService.findUserById(id);
        friends.push(user);
    }

    const FriendResponse = {
        message: GET_ALL_SUCCESS,
        data: friends,
    };

    res.status(200).send(FriendResponse);
};

FriendController.addFriend = async (req, res) => {
    try {
        if (req.body.userId === undefined || req.body.friendId === undefined) {
            res.status(200).send(ADD_FRIEND_ERROR);
            return;
        }

        const newFriend = new Friend(req.body);

        newFriend.save(async (err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            const friends = await findFriendsOfUser(req.body.userId);

            const FriendResponse = {
                message: ADD_FRIEND_SUCCESS,
                data: friends,
            };

            res.status(200).send(FriendResponse);
        });
    } catch (err) {
        res.send(err);
    }
};

FriendController.deleteFriend = async  (req, res) => {

};

export default FriendController;
