const bcrypt = require("bcrypt");
const User = require("../models/userModels");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username is already in use",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        msg: "Email is already in use",
        status: false,
      });
    }
    const encryptPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: encryptPass,
    });
    return res.json({
      status: true,
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.json({ msg: "Incorrect username.", status: false });
    }
    const passwordCheck = await bcrypt.compare(password, userFound.password);
    if (!passwordCheck) {
      return res.json({
        msg: "Incorrect password",
        status: false,
      });
    }
    return res.json({
      userId: userFound._id,
      username: userFound.username,
      email: userFound.email,
      status: true,
      profilePic: userFound.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    // it will select all the users but not including that which is sending this request that is one who logged in and we are storing them all in users array--------------> here users is array of objects
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
      "profilePic",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setProfilePic = async (req, res, next) => {
  try {
    const { userId, profilePic } = req.body;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isProfilePicSet: true,
        profilePic,
      },
      {
        //This option tells Mongoose to return the updated document after the update operation has been performed. By default, findByIdAndUpdate() returns the original document before the update is applied.
        new: true,
      }
    );
    return res.json({
      isSet: userData.isProfilePicSet,
      pic: userData.profilePic,
    });
  } catch (error) {
    next(error);
  }
};
