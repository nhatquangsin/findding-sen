import UserService from "../services/user.service";

const UserController = {};

UserController.getAll = (req, res) => {
  UserService.getAll(req, res);
};

UserController.getUser = (req, res) => {
  UserService.getUser(req, res);
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

export default UserController;
