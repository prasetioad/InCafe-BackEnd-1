const express = require("express");
const Route = express.Router();
const product = require("./product")
const user = require("./user");

Route.use("/users", user);
Route.use("/product", product);

module.exports = Route;
