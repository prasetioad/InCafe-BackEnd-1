const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  getToken: (value) => {
    const token = jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "1h" });
    return token;
  },
  decodeToken: (token) => {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode) {
      return decode;
    } else {
      return null;
    }
  },
  verifyToken: (token) => {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode) {
      return true;
    } else {
      return false;
    }
  },
};
