let express = require("express");
let { signup, login, verify } = require("../controllers/emailControllers");
let middle = require("../middleware/usemiddleware");

let route = express.Router();
route.use(express.json());
route.post("/signup", signup);
route.use(middle);
route.post("/login", login);
route.post("/verify", verify);

module.exports = route;
