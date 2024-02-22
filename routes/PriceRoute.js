import express from "express";
import {
  createPrice,
  getAllPrices,
  getPricesByModelIdAndServices,
} from "../controllers/PriceController.js";

const router = express.Router();

//POST
router.post("/", createPrice);

//GET BY ModelID and Services
router.get("/:id", getPricesByModelIdAndServices);

//GET ALL
router.get("/", getAllPrices);

export default router;
