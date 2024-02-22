import { Service } from "../models/Model.js";

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
