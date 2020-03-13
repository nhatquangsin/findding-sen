import PostService from "../services/post.service";

const PostController = {};

PostController.getAll = (req, res) => {
  PostService.getAll(req, res);
};

PostController.getPost = (req, res) => {
  PostService.getPost(req, res);
};

PostController.getSenByPostId = (req, res) => {
  PostService.getSenByPostId(req, res);
};

PostController.addPost = (req, res) => {
  PostService.addPost(req, res);
};

PostController.updatePost = (req, res) => {
  PostService.updatePost(req, res);
};

PostController.deletePost = (req, res) => {
  PostService.deletePost(req, res);
};

PostController.deleteAllPost = (req, res) => {
    PostService.deleteAllPost(req, res);
};

export default PostController;
