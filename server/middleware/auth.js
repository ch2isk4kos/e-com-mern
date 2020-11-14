const admin = require("../firebase");

exports.authenticate = async (req, res, next) => {
  console.log("HEADERS:", req.headers); // token
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.auth);
    req.user = firebaseUser;
    console.log("FIREBASE USER AUTHENTICATION:", req.user);
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid or Expired Token" });
    console.log(`Authentication Error: ${err}`);
  }
};
