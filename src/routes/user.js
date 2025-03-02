const route = require("express").Router();
const userController = require("../controllers/user");

route.post("/create-user", userController.createUserController);
route.post("/login-user", userController.loginUserController);
route.post("/check-access-token", userController.checkAccessToken);
route.post("/verify-email", userController.verifyEmailController);

module.exports = route;
