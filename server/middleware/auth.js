const admin = require("../firebase");
const User = require("../models/User");

exports.authenticateToken = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.auth)
      .catch((err) => console.log(`Auth Middlewaare Verify ID Token ${err}`));
    console.log("FIREBASE USER AUTHENTICATION:", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or Expired Token",
    });
    console.log(`Auth Middleware Authentication ${err}`);
  }
};

exports.authenticateAdmin = async (req, res, next) => {
  const { email } = req.user;
  const admin = await User.findOne({ email: email }).exec();
  if (admin.role !== "admin") {
    res.status(403).json({
      err: "User Access Denied.",
    });
  } else {
    next();
  }
};
