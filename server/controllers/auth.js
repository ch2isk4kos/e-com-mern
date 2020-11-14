const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email: email }, // find user based on email
    { name: name, picture: picture }, // update user name and picture
    { new: true } // returns updated user object
  );

  if (user) {
    res.json(user);
    console.log("USER UPDATED:", user);
  } else {
    const newUser = await new User({
      email: email,
      name: name,
      picture: picture,
    }).save();
    res.json(newUser);
    console.log("NEW USER CREATED:", newUser);
  }
};
