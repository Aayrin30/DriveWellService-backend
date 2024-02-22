import express from "express";
import { login, register } from "../controllers/AuthController.js";
import { loginValidationRules, registerValidationRules } from "../utils/requestValidator.js";

const router = express.Router();

router.post("/register", registerValidationRules(), register);

router.post("/login", loginValidationRules(), login);

export default router;
