import express from "express";
import {
  logInUser,
  logOutUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpUser);

router.post("/login", logInUser);

router.post("/logout", logOutUser);

export default router;
