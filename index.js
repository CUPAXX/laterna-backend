require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("./src/utils/standardRes");
const rootRoutes = require("./src/routes");

const { PORT } = process.env;

//create backend server
const app = express();
const server = require("http").createServer(app);

//apply body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//apply cord rules for frontend integration
app.use(cors());

//listen output server
server.listen(PORT || 8000, () => {
  console.log(`Backend running on port ${PORT || 8000}`);
});

app.get("/", (req, res) => {
  return response(res, 200, true, "Hello there, this is Laterna backend!!!");
});

app.use("/", rootRoutes);
