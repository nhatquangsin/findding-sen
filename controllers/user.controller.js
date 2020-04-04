import UserService from "../services/user.service";
import Like from "../models/like";
import Post from "../models/post";
import { GET_LIKED_POSTS_SUCCESS } from "../messages/user.message";
import User from "../models/user";

const UserController = {};

UserController.getAll = (req, res) => {
  UserService.getAll(req, res);
};

UserController.getUser = (req, res) => {
  UserService.getUser(req, res);
};

UserController.signin = (req, res) => {
  UserService.signin(req, res);
};

UserController.addUser = (req, res) => {
  UserService.addUser(req, res);
};

UserController.updateUser = (req, res) => {
  UserService.updateUser(req, res);
};

UserController.deleteUser = (req, res) => {
  UserService.deleteUser(req, res);
};

UserController.getLikedPostsOfUser = async (req, res) => {
  const userId = req.params.id;
  const likes = await Like.find({ userId });
  const allLikes = await Like.find();
  let posts = [];

  for (const like of likes) {
    let post = await Post.findById(like.postId);
    const user = await User.findById(post.senId).select('-password');
    const likeUsers = allLikes
        .filter(like => like.postId.toString() === post._id.toString());

    posts.push({
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

  const UserResponse = {
    message: GET_LIKED_POSTS_SUCCESS,
    data: posts,
  };
  res.status(200).send(UserResponse);
};

export default UserController;
