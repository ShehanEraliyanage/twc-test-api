import { userModel } from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const email = req.body.email;
    const password = hash;

    let newUser = new userModel({
      email,
      password,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "User created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const LoginUser = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await userModel.findOne({ email });
    //if user doesnt exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    //if user exist then check the password

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: "false", message: "Incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc;

    //create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in browser cookie and responce to client

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expiresIn: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to login" });
  }
};
