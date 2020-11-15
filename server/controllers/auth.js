const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email }, // find user based on email
    { name: email.split("@")[0], picture: picture }, // update user name and picture
    { new: true } // returns updated user object
  );

  if (user) {
    console.log("USER UPDATED:", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split("@")[0],
      picture: picture,
    }).save();
    console.log("NEW USER CREATED:", newUser);
    res.json(newUser);
  }
};
