import Like from "../models/like";
import {
    ADD_LIKE_ERROR,
    ADD_LIKE_SUCCESS,
    DELETE_LIKE_SUCCESS,
    GET_ALL_OF_POST_SUCCESS,
} from "../messages/like.message";
import {GET_ALL_SUCCESS} from "../messages/like.message";

const LikeController = {};

LikeController.getLikesOfPost = async (req, res) => {
    try {
        let likes = await Like.find({postId: req.params.postId});

        const LikeResponse = {
            message: GET_ALL_OF_POST_SUCCESS,
            dataList: likes,
        };

        res.status(200).send(LikeResponse);
    } catch (err) {
        res.send(err);
    }
};

LikeController.getAll = async (req, res) => {
    try {
        let likes = await Like.find();

        const LikeResponse = {
            message: GET_ALL_SUCCESS,
            dataList: likes,
        };

        res.status(200).send(LikeResponse);
    } catch (err) {
        res.send(err);
    }
};

LikeController.addLike = async (req, res) => {
    try {
        if (req.body.userId === undefined || req.body.postId === undefined) {
            res.status(200).send(ADD_LIKE_ERROR);
            return;
        }

        const newLike = new Like(req.body);

        newLike.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }

            const LikeResponse = {
                message: ADD_LIKE_SUCCESS,
                data: saved,
            };

            res.status(200).send(LikeResponse);
        });
    } catch (err) {
        res.send(err);
    }
};

LikeController.deleteLike = async (req, res) => {
    try {
        if (req.body.userId === undefined || req.body.postId === undefined) {
            res.status(200).send(DELETE_LIKE_SUCCESS);
            return;
        }

        await Like.findOneAndRemove({postId: req.body.postId, userId: req.body.userId}, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            const LikeResponse = {
                message: DELETE_LIKE_SUCCESS,
            };
            res.status(200).send(LikeResponse);
        });
    } catch (err) {
        res.send(err);
    }
};

export default LikeController;
