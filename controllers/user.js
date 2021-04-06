const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const formatResult = require("../helpers/formatResult");
const bcrypt = require("bcrypt");
const { validAuthUser } = require("../helpers/validator");
const User = db.user;

exports.create = async (req, res) => {
  const check = validAuthUser(req.body);
  if (check === true) {
    req.body.userId = uuidv4();
    req.body.password = await bcrypt.hash(req.body.password, 10).then((result) => result);
    User.create(req.body)
      .then(() => {
        formatResult(res, 201, true, "Success Register", {
          userId: req.body.userId,
          email: req.body.email,
        });
      })
      .catch((err) => {
        formatResult(res, 500, false, err, null);
      });
  } else {
    formatResult(res, 400, false, "Some Field Cannot Be Empty", check[0]);
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const checkEmail = await User.findOne({ where: { email }, order: ["email"] })
    .then((result) => result.dataValues)
    .catch(() => null);
  if (checkEmail) {
    const password = bcrypt.compareSync(req.body.password, checkEmail.password);
    if (password) {
      delete checkEmail.password;
      formatResult(res, 200, true, "Login Success", checkEmail);
    } else {
      formatResult(res, 400, false, "Password Incorrect", null);
    }
  } else {
    formatResult(res, 400, false, "Email Not Registered", null);
  }
};

exports.getData = (req, res) => {
  User.findAll()
    .then((result) => {
      formatResult(res, 200, true, "Success Get Users", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};
