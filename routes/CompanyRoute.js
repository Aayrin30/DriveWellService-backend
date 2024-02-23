import express from 'express'
import { createCompany, deleteCompany, getAllCompanies, getCompanyById } from '../controllers/CompanyController.js';

const router=express.Router();

//POST
router.post("/", createCompany);

//GET
router.get("/:id",getCompanyById);

//GET ALL
router.get("/",getAllCompanies);

//DELETE Company
router.delete("/:id",deleteCompany);


export default router;