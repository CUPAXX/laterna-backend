const userModels = require("../models/user");
const { response } = require("../utils/standardRes");
const bcrypt = require("bcrypt");

exports.createUserController = async (req, res) => {
  const body = req.body;
  const encryptedPassword = await bcrypt.hash(body.password, 10);

  const finalData = {
    email: body.email,
    password: encryptedPassword,
  };

  const resultQuery = await userModels.createUser(finalData);
  if (resultQuery.affectedRows > 0) {
    return response(res, 200, true, "New User successfully created!");
  }
};
