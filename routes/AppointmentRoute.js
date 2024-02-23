import express from "express";
import {
  createAppointment,
  getAllAppointment,
  getAppointmentByUserId,
} from "../controllers/AppointmentController.js";
import { appointmentValidationRules } from "../utils/requestValidator.js";

const router = express.Router();

//POST
router.post("/", appointmentValidationRules(), createAppointment);

//GET
router.get("/:id", getAppointmentByUserId );

//GET ALL
router.get("/", getAllAppointment);


export default router;

