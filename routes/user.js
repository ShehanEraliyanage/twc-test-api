import express from "express";

//controllers
import { LoginUser, RegisterUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.get("login", LoginUser);

export default router;
