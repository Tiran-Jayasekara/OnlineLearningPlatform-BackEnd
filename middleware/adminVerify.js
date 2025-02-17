const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyAuth = (req, res, next) => {
  const token = req.header(process.env.ReqHeader);
  if (!token) return res.status(401).send("No token provided");
  try {
    const payload = jwt.verify(token, process.env.SecretKey);
    req.user = payload;
    if (payload) next();
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};


module.exports.verifyAdmin = (req, res, next) => {
  const token = req.header(process.env.ReqHeader);
  if (!token) return res.status(401).send("No token provided");
  try {
    const payload = jwt.verify(token, process.env.SecretKey);
    req.user = payload;
    if (payload.role === "admin") next();
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};
