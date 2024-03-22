import express from "express";
import {
  createPrice,
  deletePrice,
  getAllPrices,
  getPricesByModelIdAndServices,
} from "../controllers/PriceController.js";

const router = express.Router();

//POST
router.post("/", createPrice);

//DELETE
router.delete("/:id", deletePrice);

//Get Total Price based on Model and Service
router.get("/:modelId", getPricesByModelIdAndServices);

//GET ALL
router.get("/", getAllPrices);

export default router;
