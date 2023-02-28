import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const userModel = mongoose.model("users", userSchema);
