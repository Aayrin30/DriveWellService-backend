import express from 'express'
import { createCompany, getAllCompanies, getCompanyById } from '../controllers/CompanyController.js';

const router=express.Router();

//POST
router.post("/", createCompany);

//GET
router.get("/:id",getCompanyById);

//GET ALL
router.get("/",getAllCompanies);


export default router;