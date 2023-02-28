import { userModel } from "../models/user.js";

export const RegisterUser = async (req, res) => {
  const user = new userModel({
    email: req.body.email,
    password: req.body.password,
  });
  const details = await user.save();
  if (details) {
    res.send({
      status: true,
      details: details,
    });
  } else {
    res.send({
      status: false,
    });
  }
};

export const LoginUser = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    //if user doesnt exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    //if user exist then check the password

    let checkCorrectPassword = false;
    if (req.body.password === user.password) {
      return (checkCorrectPassword = true);
    }

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: "false", message: "Incorrect email or password" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to login" });
  }
};
