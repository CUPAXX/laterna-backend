const userModels = require("../models/user");
const { response } = require("../utils/standardRes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    
    const accessToken = jwt.sign(
      { email: userData[0].email, user_id: userData[0].id_user },
      process.env.APP_KEY,
      { expiresIn: "1m" }
    );

    return response(res, 200, true, "Login success!", {
      accessToken: accessToken,
    });
  } else {
    return response(res, 200, true, "Wrong password!!");
  }
};

exports.checkAccessToken = async (req, res) => {
  const { access_token } = req.body;

  try {
    const checkToken = jwt.verify(access_token, process.env.APP_KEY);
    if (checkToken) return response(res, 200, true, "Token still valid!");
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return response(res, 400, false, "Token Expired!!");
  }
};
