import express from "express";

//Controllers
import {
  addContact,
  deleteContact,
  getAllContact,
  updateContact,
} from "../controllers/contact.js";

const router = express.Router();

router.post("/new", addContact);
router.get("/all", getAllContact);
router.post("/delete", deleteContact);
router.post("/updateContact", updateContact);

export default router;
