import express from "express";

//controllers
import { LoginUser, RegisterUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

export default router;
