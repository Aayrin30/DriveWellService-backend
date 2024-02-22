import express from "express";
import {
  createAppointment,
  getAllAppointment,
} from "../controllers/AppointmentController.js";
import { appointmentValidationRules } from "../utils/requestValidator.js";

const router = express.Router();

//POST
router.post("/", appointmentValidationRules(), createAppointment);

//GET ALL
router.get("/", getAllAppointment);

export default router;

