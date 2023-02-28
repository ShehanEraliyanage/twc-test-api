import { contactModel } from "../models/contact.js";

export const addContact = async (req, res) => {
  const contact = new contactModel({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
  });
  const details = await contact.save();
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

export const getAllContact = async (req, res) => {
  const contacts = new contactModel.find({});
  res.send(contacts);
};

export const deleteContact = async (req, res) => {
  const contact = await contactModel.findByIdAndDelete({ _id: req.body.id });
  res.send(contact);
};

export const updateContact = async (req, res) => {
  try {
    const contact = await contactModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        _id: req.body.id,
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
      },
      {
        new: true,
      }
    );
    if (contact) {
      res.send({
        status: true,
        details: contact,
      });
    } else {
      res.send({
        status: false,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
