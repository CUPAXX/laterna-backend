const userModels = require("../models/user");
const { response } = require("../utils/standardRes");
const bcrypt = require("bcrypt");

exports.createUserController = async (req, res) => {
  const body = req.body;
  const encryptPassword = await bcrypt.hash(body.password, 10);

  const finalData = {
    email: body.email,
    password: encryptPassword,
  };
  const resultQuery = await userModels.createUser(finalData);
  if (resultQuery.affectedRows > 0) {
    return response(res, 200, true, "New User successfully created!");
  }
};

exports.loginUserController = async (req, res) => {
  const body = req.body;

  const userData = await userModels.getUserByEmail(body.email);

  if (userData.length === 0)
    return response(res, 404, true, "User Not Found!!");

  const comparePassword = await bcrypt.compare(
    body.password,
    userData[0].password
  );

  if (comparePassword) {
    return response(res, 200, true, "Login success!");
  } else {
    return response(res, 200, true, "Wrong password!!");
  }
};
