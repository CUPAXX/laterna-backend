const db = require("../helpers/db");
const { promisify } = require("util");
const dbPromise = promisify(db.query).bind(db);

exports.createUser = (data) => {
  return dbPromise(
    `INSERT INTO user (email, password) VALUES ("${data.email}", "${data.password}")`
  );
};
