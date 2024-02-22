import express from "express";
import {
  createService,
  getAllServices,
} from "../controllers/ServiceController.js";

const router = express.Router();

//POST
router.post("/", createService);

//GET ALL
router.get("/", getAllServices);

export default router;
