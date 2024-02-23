import { Service } from "../models/Model.js";

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json({service,message:"Service has been Created"});
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


export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) return res.status(404).json({ error: "Service Does not Exist" });
    const deletedRowCount = await Service.destroy({ where: { id } });
    if (deletedRowCount === 1) {
      return res.status(200).json({ message: "Service has been deleted." });
    } else {
      return res.status(500).json({ error: "Failed to delete Company" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
