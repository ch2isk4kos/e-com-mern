var admin = require("firebase-admin");
var serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-com-mern.firebaseio.com",
});

module.exports = admin;
