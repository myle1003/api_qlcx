const jwt = require("jsonwebtoken");
// require("dotenv").config();

async function auth(req, res, next) {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({
      message: "Access denied. No token provided",
      status: false,
    });
  } else {
    try {
      const decoded = jwt.verify(token, "qlcx");
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({
        message: "Invalid token",
        status: false,
      });
    }
  }
}
module.exports = auth;
