import { validationResult } from "express-validator";
import { Appointment } from "../models/Appointment.js";
import { sendAppointmentConfirmationEmail } from "../utils/email_sender.js";
import { formatData } from "../utils/formatData.js";
import { getPricesByModelIdAndServices } from "./PriceController.js";

export const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const totalPrice = await getPricesByModelIdAndServices({
    modelId: req.body.modelSelect,
    selectedServices: req.body.services,
  });

  try {
    const appointment = await Appointment.create({ ...req.body, totalPrice });
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
      appointment,
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
export const getAppointmentByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findAll({ where: { userId: id } });
    if (appointment) {
      return res.status(200).json(appointment);
    } else {
      return res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
