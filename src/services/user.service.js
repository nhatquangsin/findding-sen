import slug from "limax";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";
import {
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  GET_ALL_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_NOT_FOUND,
  WRONG_PASSWORD
} from "../messages/user.message";
import User from "../models/user";
import {findFriendsOfUser} from "./friend.service";

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

UserService.signin = async (req, res) => {
  try {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
      if (!user) {
        res.status(200).json({ message: USER_NOT_FOUND, status: 401 });
      } else if (user) {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({ message: WRONG_PASSWORD, status: 401 });
        } else {
          const friends = await findFriendsOfUser(user._id);

          return res.status(200).json({
            status: 200,
            token: jwt.sign(
              {
                email: user.email,
                fullname: user.fullname,
                _id: user._id
              },
              config.secret,
              {
                expiresIn: "24h"
              }
            ),
            user,
            friends,
          });
        }
      }
    });
  } catch (err) {
    res.send(err);
  }
};

UserService.addUser = async (req, res) => {
  try {
    if (
      !req.body.fullname ||
      !req.body.email ||
      !req.body.role ||
      !req.body.password
    ) {
      res.status(403).end();
    }
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newUser = new User(req.body);
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
      let hashedPassword = bcrypt.hashSync(req.body.password, 8);
      user.fullname = req.body.fullname || user.fullname;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.phone = req.body.phone || user.phone;
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
      if (deleteRes.n === 0) {
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

UserService.findUserById = async (userId) => {
  return await User.findById(userId);
};

export default UserService;
