import express from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  getModelsByCompanyId,
} from "../controllers/ModelController.js";

const router = express.Router();

//POST
router.post("/:id", createModel);

//GET
router.get("/find/:id", getModelById);

//GET BY COMPANYID
router.get("/:companyId", getModelsByCompanyId);

//GET ALL
router.get("/", getAllModels);

//DELETE
router.delete("/:id", deleteModel);

export default router;
