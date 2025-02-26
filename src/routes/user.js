const route = require("express").Router();
const userController = require("../controllers/user");

route.post("/create-user", userController.createUserController);

module.exports = route;
