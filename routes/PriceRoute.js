import express from "express";
import { createPrice, deletePrice, getAllPrices } from "../controllers/PriceController.js";

const router = express.Router();

//POST
router.post("/", createPrice);

//DELETE
router.delete("/:id", deletePrice);

//GET ALL
router.get("/", getAllPrices);

export default router;
