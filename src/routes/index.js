const router = require("express").Router();

//import all routes
const userRoute = require("./user");

//assign main routes
router.use("/user", userRoute);

module.exports = router;
