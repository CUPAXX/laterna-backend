const userModels = require("../models/user");
const { response } = require("../utils/standardRes");

exports.createUserController = async (req, res) => {
  const body = req.body;
  const finalData = {
    email: body.email,
    password: body.password,
  };
  const resultQuery = await userModels.createUser(finalData);
  if (resultQuery.affectedRows > 0) {
    return response(res, 200, true, "New User successfully created!");
  }
};
