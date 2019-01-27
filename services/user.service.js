import User from "../models/user";
import slug from "limax";
import bcrypt from "bcryptjs";
import {
  GET_ALL_SUCCESS,
  GET_USER_SUCCESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  USER_NOT_FOUND
} from "../messages/user.message";

const UserService = {};

UserService.getAll = async (req, res) => {
  try {
    await User.find().exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      }
      const UserResponse = {
        message: GET_ALL_SUCCESS,
        dataList: users
      };
      res.status(200).send(UserResponse);
    });
  } catch (err) {
    res.send(err);
  }
};

UserService.getUser = async (req, res) => {
  try {
    User.findById(req.params.id).exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      if (user !== null) {
        const UserResponse = {
          message: GET_USER_SUCCESS,
          data: user
        };
        res.status(200).send(UserResponse);
      } else {
        const UserResponse = {
          message: USER_NOT_FOUND
        };
        res.status(400).send(UserResponse);
      }
    });
  } catch (err) {
    res.send(err);
  }
};

UserService.addUser = async (req, res) => {
  try {
    if (
      !req.body.user.fullname ||
      !req.body.user.email ||
      !req.body.user.role ||
      !req.body.user.password
    ) {
      res.status(403).end();
    }
    let hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
    const newUser = new User(req.body.user);
    newUser.password = hashedPassword;
    newUser.slug = slug(newUser.fullname.toLowerCase(), { lowercase: true });

    newUser.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      const UserResponse = {
        message: ADD_USER_SUCCESS,
        data: saved
      };
      res.status(200).send(UserResponse);
    });
  } catch (err) {
    res.send(err);
  }
};

UserService.updateUser = async (req, res) => {
  try {
    User.findById(req.params.id).exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      let hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
      user.fullname = req.body.user.fullname || user.fullname;
      user.email = req.body.user.email || user.email;
      user.role = req.body.user.role || user.role;
      user.phone = req.body.user.phone || user.phone;
      user.password = hashedPassword || user.password;
      user.slug = slug(user.fullname.toLowerCase(), {
        lowercase: true
      });

      user.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        const UserResponse = {
          message: UPDATE_USER_SUCCESS,
          data: saved
        };
        res.status(200).send(UserResponse);
      });
    });
  } catch (err) {
    res.send(err);
  }
};

UserService.deleteUser = async (req, res) => {
  try {
    User.findByIdAndRemove(req.params.id, (err, deleteRes) => {
      if (err) {
        res.status(500).send(err);
      }
      if (deleteRes.n == 0) {
        const UserResponse = {
          message: USER_NOT_FOUND
        };
        res.status(400).send(UserResponse);
      } else {
        const UserResponse = {
          message: DELETE_USER_SUCCESS
        };
        res.status(200).send(UserResponse);
      }
    });
  } catch (err) {
    res.send(err);
  }
};

export default UserService;
