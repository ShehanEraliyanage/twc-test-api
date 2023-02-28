import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

export const contactModel = mongoose.model("contacts", contactSchema);
