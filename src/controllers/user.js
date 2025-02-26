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
    const generateToken = jwt.sign(userData[0], process.env.APP_KEY, {
      expiresIn: "1m",
    });

    return response(res, 200, true, "Login success!", { token: generateToken });
  } else {
    return response(res, 200, true, "Wrong password!!");
  }
};

exports.checkLoginTokenController = async (req, res) => {
  const body = req.body;

  try {
    const verifyToken = jwt.verify(body.token, process.env.APP_KEY);
    if(verifyToken) return response(res, 200, true, "Token still active!")
  } catch (error) {
    if (error.message === "jwt expired") {
      return response(res, 200, true, "Token Expired!!");
    } else {
      return response(res, 200, true, "Token Invalid!!");
    }
  } 
};
