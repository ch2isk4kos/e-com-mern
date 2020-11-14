const admin = require("../firebase");

exports.authenticate = (req, res, next) => {
  console.log(req.headers); // token
  next();
};
