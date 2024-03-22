import { validationResult } from "express-validator";
import { Appointment } from "../models/Appointment.js";
import { sendAppointmentConfirmationEmail } from "../utils/email_sender.js";
import {
  createAppointmentFormatData,
  updateAppointmentFormatData,
} from "../utils/formatData.js";

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
      vehicleNumber,
    } = appointment.toJSON();

    const appointmentDetails = await createAppointmentFormatData(
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
    sendAppointmentConfirmationEmail(customerEmail, {
      ...otherDetails,
      vehicleNumber,
    });

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
      return res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment)
      return res.status(404).json({ error: "Appointment Does not Exist" });
    const appointmentRowCount = await Appointment.destroy({ where: { id } });
    if (appointmentRowCount === 1) {
      return res.status(200).json({ message: "Appointment has been deleted." });
    } else {
      return res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment Does not Exist" });
    if (appointment.status)
      return res
        .status(400)
        .json({ error: "Appointment status is already true" });
    const [updatedRowsCount] = await Appointment.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 1) {
      const {
        firstName,
        services,
        instruction,
        modelSelect,
        userId,
        totalPrice,
        vehicleNumber,
      } = appointment.toJSON();
      const appointmentDetails = await updateAppointmentFormatData(
        firstName,
        services,
        instruction,
        modelSelect,
        userId,
        totalPrice
      );
      if (!appointmentDetails) {
        throw new Error("Failed to format appointment data");
      }
      const { customerEmail, ...otherDetails } = appointmentDetails;
      sendAppointmentConfirmationEmail(customerEmail, {
        ...otherDetails,
        status: true,
        vehicleNumber,
      });
      return res.status(200).json({ message: "Appointment has been Updated" });
    } else {
      return res.status(500).json({ error: "Failed to update user" });
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
