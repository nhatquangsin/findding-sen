import {
    GET_ALL_SUCCESS,
    GET_POST_SUCCESS,
    ADD_POST_SUCCESS,
    UPDATE_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    POST_NOT_FOUND,
    GET_AUTHOR_OF_POST_SUCCESS, DELETE_ALL_POSTS_SUCCESS, ADD_POST_ERROR
} from "../messages/post.message";
import User from "../models/user";
import Post from "../models/post";
import Like from "../models/like";

const PostService = {};

PostService.getAll = async (req, res) => {
    try {
        Post.find().exec(async (err, posts) => {
            if (err) {
                res.send(500).send(err);
            }
            const resPosts = [];
            let likes = await Like.find();

            for (const post of posts) {
                const user = await User.findById(post.senId).select('-password');
                const likeUsers = likes
                    .filter(like => like.postId.toString() === post._id.toString());

                resPosts.push({
                    images: post.images,
                    coordinate: post.coordinate,
                    _id: post._id,
                    postType: post.postType,
                    content: post.content,
                    address: post.address,
                    pricePerDay: post.pricePerDay,
                    isAvailable: post.isAvailable,
                    createdAt: post.createdAt,
                    likes: likeUsers,
                    user,
                });
            }

            resPosts.sort((postA, postB) => parseInt(postB.createdAt) - parseInt(postA.createdAt));

            const PostResponse = {
                message: GET_ALL_SUCCESS,
                dataList: resPosts,
            };

            await res.status(200).send(PostResponse);
        });
    } catch (err) {
        res.send(err);
    }
};

PostService.getPost = async (req, res) => {
    try {
        Post.findById(req.params.id).exec((err, post) => {
            if (err) {
                res.status(500).send(err);
            }
            if (post !== null) {
                const PostResponse = {
                    message: GET_POST_SUCCESS,
                    data: post
                };
                res.status(200).send(PostResponse);
            } else {
                const PostResponse = {
                    message: POST_NOT_FOUND
                };
                res.status(400).send(PostResponse);
            }
        });
    } catch (err) {
        res.send(err);
    }
};

PostService.getSenByPostId = async (req, res) => {
    try {
        Post.findById(req.params.id)
            .populate("senId")
            .exec((err, post) => {
                if (err) {
                    res.status(500).send(err);
                }
                const PostResponse = {
                    message: GET_AUTHOR_OF_POST_SUCCESS,
                    data: post.senId
                };
                res.status(200).send(PostResponse);
            });
    } catch (err) {
        res.send(err);
    }
};

PostService.addPost = async (req, res) => {
    try {
        if (req.body.senId === undefined || req.body.content === undefined || req.body.postType === undefined) {
            res.status(200).send(ADD_POST_ERROR);
            return;
        }

        const newPost = new Post(req.body);
        newPost.isAvailable = true;
        newPost.createdAt = Date.now().toString();

        newPost.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }

            const PostResponse = {
                message: ADD_POST_SUCCESS,
                data: saved
            };

            res.status(200).send(PostResponse);
        });
    } catch (err) {
        res.send(err);
    }
};

PostService.updatePost = async (req, res) => {
    try {
        Post.findById(req.params.id).exec((err, post) => {
            if (err) {
                res.status(500).send(err);
            }
            post.images = req.body.images || post.images;
            post.content = req.body.content || post.content;
            post.address = req.body.address || post.address;
            post.pricePerDay = req.body.pricePerDay || post.pricePerDay;
            post.isAvailable = req.body.isAvailable || post.isAvailable;
            post.fromDate = req.body.fromDate || post.fromDate;
            post.endDate = req.body.endDate || post.endDate;
            post.senId = req.body.senId || post.senId;
            post.coordinate = req.body.coordinate || post.coordinate;

            post.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                }
                const PostResponse = {
                    message: UPDATE_POST_SUCCESS,
                    data: saved
                };
                res.status(200).send(PostResponse);
            });
        });
    } catch (err) {
        res.send(err);
    }
};

PostService.deletePost = async (req, res) => {
    try {
        Post.findByIdAndRemove(req.params.id, (err, deleted) => {
            if (err) {
                res.status(500).send(err);
            }
            if (deleted.n === 0) {
                const PostResponse = {
                    message: POST_NOT_FOUND
                };
                res.status(400).send(PostResponse);
            } else {
                const PostResponse = {
                    message: DELETE_POST_SUCCESS
                };
                res.status(200).send(PostResponse);
            }
        });
    } catch (err) {
        res.send(err);
    }
};

PostService.deleteAllPost = async (req, res) => {
    try {
        await Post.remove({}, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            const Response = {
                message: DELETE_ALL_POSTS_SUCCESS,
            };
            res.status(200).send(Response);
        });
    } catch (err) {
        res.send(err);
    }
};

export default PostService;
