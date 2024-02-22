import { Model } from "../models/Model.js";

export const getAllModels = async (req, res) => {
  try {
    const models = await Model.findAll();
    return res.status(200).json(models);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get Model by ID
export const getModelById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const model = await Model.findByPk(id);
    if (model) {
      return res.status(200).json(model);
    } else {
      return res.status(404).json({ error: "Model not found" });
    }
  } catch (error) {
    console.error("Error fetching Model by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Model
export const createModel = async (req, res) => {
  const companyId = req.params.id;
  try {
    const newModel = await Model.create({ name: req.body.name, companyId });
    return res.status(201).json(newModel);
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getModelsByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const models = await Model.findAll({ where: { companyId } });
    return res.status(200).json(models);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
