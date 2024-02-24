import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointment,
  getAppointmentByUserId,
  updateAppointmentStatus,
} from "../controllers/AppointmentController.js";
import { appointmentValidationRules } from "../utils/requestValidator.js";

const router = express.Router();

//POST
router.post("/", appointmentValidationRules(), createAppointment);

//GET
router.get("/:id", getAppointmentByUserId );

//GET ALL
router.get("/", getAllAppointment);

//DELETE
router.delete("/:id", deleteAppointment);

//Update Status
router.put("/:id", updateAppointmentStatus);


export default router;

