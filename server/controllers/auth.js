const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email }, // find user based on email
    { name: name, picture: picture }, // update user name and picture
    { new: true } // returns updated user object
  );

  if (user) {
    console.log("USER UPDATED:", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: name,
      picture: picture,
    }).save();
    console.log("NEW USER CREATED:", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
