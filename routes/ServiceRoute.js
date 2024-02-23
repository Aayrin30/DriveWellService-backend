import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
} from "../controllers/ServiceController.js";

const router = express.Router();

//POST
router.post("/", createService);

//GET ALL
router.get("/", getAllServices);

//GET ALL
router.delete("/:id", deleteService);

export default router;
