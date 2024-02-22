import { validationResult } from "express-validator";
import { Appointment } from "../models/Appointment.js";
import { sendAppointmentConfirmationEmail } from "../utils/email_sender.js";
import { formatData } from "../utils/formatData.js";

export const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const appointment = await Appointment.create(req.body);
    if (!appointment) {
      throw new Error("Failed to create appointment");
    }

    const {
      firstName,
      appointmentDate,
      services,
      instruction,
      modelSelect,
      userId,
    } = appointment.toJSON();

    const appointmentDetails = await formatData(
      firstName,
      appointmentDate,
      services,
      instruction,
      modelSelect,
      userId
    );

    if (!appointmentDetails) {
      throw new Error("Failed to format appointment data");
    }
    const { customerEmail, ...otherDetails } = appointmentDetails;
    sendAppointmentConfirmationEmail(customerEmail, otherDetails);

    return res.status(201).json({
      appointmentDetails,
      message: "Appointment created successfully.",
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const getAllAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findAll();
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
