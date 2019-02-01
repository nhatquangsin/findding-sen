import UserService from "../services/user.service";
import UserMiddleware from "../middleware/user.middlewares";

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

export default UserController;
