const express = require("express");
const Route = express.Router();
const user = require("./user");

Route.use("/users", user);

module.exports = Route;
