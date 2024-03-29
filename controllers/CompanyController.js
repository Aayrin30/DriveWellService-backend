import { Company } from "../models/Model.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    return res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const company = await Company.findByPk(id);
    if (company) {
      return res.status(200).json(company);
    } else {
      return res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new company
export const createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    return res.status(201).json({newCompany,message:"Company has been Created."});
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findByPk(id);

    if (!company) return res.status(404).json({ error: "Company Does not Exist" });
    const deletedRowCount = await Company.destroy({ where: { id } });
    if (deletedRowCount === 1) {
      return res.status(200).json({message:"Company has been deleted."});
    } else {
      return res.status(500).json({ error: "Failed to delete Company" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};