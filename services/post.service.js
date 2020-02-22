import Post from "../models/post";
import slug from "limax";

import {
  GET_ALL_SUCCESS,
  GET_POST_SUCCESS,
  ADD_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  POST_NOT_FOUND,
  GET_AUTHOR_OF_POST_SUCCESS
} from "../messages/post.message";

const PostService = {};

PostService.getAll = async (req, res) => {
  try {
    await Post.find().exec((err, posts) => {
      if (err) {
        res.send(500).send(err);
      }
      const PostResponse = {
        message: GET_ALL_SUCCESS,
        dataList: posts
      };
      res.status(200).send(PostResponse);
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
    if (!req.body.name) {
      res.status(403).end();
    }
    const newPost = new Post(req.body);
    newPost.slug = slug(newPost.name.toLowerCase(), { lowercase: true });

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
      post.name = req.body.name || post.name;
      post.images = req.body.images || post.images;
      post.content = req.body.content || post.content;
      post.address = req.body.address || post.address;
      post.pricePerDay = req.body.pricePerDay || post.pricePerDay;
      post.isAvailable = req.body.isAvailable || post.isAvailable;
      post.fromDate = req.body.fromDate || post.fromDate;
      post.endDate = req.body.endDate || post.endDate;
      post.senId = req.body.senId || post.senId;
      post.coordinate = req.body.coordinate || post.coordinate;
      post.slug = slug(post.name.toLowerCase(), { lowercase: true });

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
      if (deleted.n == 0) {
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

export default PostService;
