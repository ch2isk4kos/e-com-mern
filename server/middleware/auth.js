const admin = require("../firebase");

exports.authenticateToken = async (req, res, next) => {
  // console.log("HEADERS:", req.headers); // token
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
