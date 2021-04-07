const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const formatResult = require("../helpers/formatResult");
const bcrypt = require("bcrypt");
const { validAuthUser } = require("../helpers/validator");
const {
  getToken,
  decodeToken,
  verifyToken,
  getTokenReset,
  verifyTokenReset,
  decodeTokenReset,
  getTokenVerify,
  decodeTokenVerify,
  verifyTokenVerify,
} = require("../helpers/jwtHelper");
const e = require("express");
const User = db.user;

exports.register = (req, res) => {
  const check = validAuthUser(req.body);
  if (check === true && req.body.email) {
    User.findOne({ where: { email: req.body.email } }).then(async (resultFind) => {
      if (resultFind) {
        return formatResult(res, 400, false, "Email Already Registered!", null);
      } else {
        req.body.userId = uuidv4();
        req.body.password = await bcrypt.hash(req.body.password, 10).then((result) => result);
        User.create(req.body)
          .then(() => {
            formatResult(res, 201, true, "Success Register, Please Verify Your Email!", {
              userId: req.body.userId,
              email: req.body.email,
              token: getTokenVerify(req.body),
            });
          })
          .catch((err) => {
            formatResult(res, 500, false, err, null);
          });
      }
    });
  } else {
    formatResult(res, 400, false, "Some Field Cannot Be Empty", check[0]);
  }
};

exports.verify = (req, res) => {
  const verify = verifyTokenVerify(req);
  if (verify !== true) return formatResult(res, 400, false, verify, null);
  const decode = decodeTokenVerify(req);
  const email = decode.email;
  User.update({ active: true }, { where: { email } })
    .then(() => {
      formatResult(res, 200, true, "Success Active Your Account!", null);
    })
    .catch((err) => {
      formatResult(res, 400, false, err, null);
    });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const checkEmail = await User.findOne({ where: { email }, order: ["email"] })
    .then((result) => result.dataValues)
    .catch(() => null);
  if (checkEmail) {
    if (!checkEmail.active) {
      formatResult(res, 400, false, "Email Not Verify, Please Verify Your Email!", null);
    } else {
      const password = bcrypt.compareSync(req.body.password, checkEmail.password);
      if (password) {
        delete checkEmail.password;
        const token = getToken(checkEmail);
        formatResult(res, 200, true, "Login Success", { ...checkEmail, token });
      } else {
        formatResult(res, 400, false, "Password Incorrect", null);
      }
    }
  } else {
    formatResult(res, 400, false, "Email Not Registered", null);
  }
};

exports.update = (req, res) => {
  const verify = verifyToken(req);
  if (verify !== true) return formatResult(res, 400, false, verify, null);
  const decode = decodeToken(req);
  const userId = decode.userId;
  User.update(req.body, { where: { userId }, order: ["userId"] })
    .then(() => {
      User.findOne({ where: { userId }, order: ["userId"] })
        .then((results) => {
          delete results.dataValues.password;
          formatResult(res, 200, true, "Data Updated", results);
        })
        .catch((err) => {
          formatResult(res, 500, false, err, null);
        });
    })
    .catch((err) => {
      formatResult(res, 400, false, err, null);
    });
};

exports.getProfile = (req, res) => {
  const verify = verifyToken(req);
  if (verify !== true) return formatResult(res, 400, false, verify, null);
  const decode = decodeToken(req);
  const userId = decode.userId;
  User.findOne({ where: { userId }, order: ["userId"] })
    .then((result) => {
      delete result.dataValues.password;
      formatResult(res, 200, true, "Success Get Profile", result);
    })
    .catch((err) => {
      formatResult(res, 400, false, err, null);
    });
};

exports.requestResetPassword = (req, res) => {
  if (req.body.email) {
    const email = req.body.email;
    User.findOne({ where: { email }, order: ["email"] })
      .then((result) => {
        if (result) {
          const TokenReset = getTokenReset(req.body);
          formatResult(res, 200, true, "Success Request Reset Password", { token: TokenReset });
        } else {
          formatResult(res, 404, false, "Email Not Registered", null);
        }
      })
      .catch((err) => {
        formatResult(res, 400, false, err, null);
      });
  } else {
    formatResult(res, 404, false, "Field Email Required", null);
  }
};

exports.resetPassword = async (req, res) => {
  const verify = verifyTokenReset(req);
  if (req.body.password && verify === true) {
    const decode = decodeTokenReset(req);
    const email = decode.email;
    req.body.password = await bcrypt.hash(req.body.password, 10).then((result) => result);
    User.update(req.body, { where: { email } })
      .then((result) => {
        if (result.length === 1) {
          formatResult(res, 200, true, "Success Reset Password", null);
        } else {
          formatResult(res, 500, false, "Internal Server Error", null);
        }
      })
      .catch((err) => {
        formatResult(res, 500, false, err, null);
      });
  } else {
    formatResult(res, 500, false, "Your Data Incorrect", null);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const deleted = await User.destroy({ where: { id } });
  if (deleted === 1) {
    formatResult(res, 200, true, "Success Deleted", null);
  } else {
    formatResult(res, 404, false, "User Not Found", null);
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
