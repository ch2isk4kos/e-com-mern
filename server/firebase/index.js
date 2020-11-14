const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-com-mern.firebaseio.com",
});

module.exports = admin;
