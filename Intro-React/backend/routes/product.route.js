import express from "express";
import { createProduct, deleteProdct, getProducts, updateProduct } from "../controllers/product.controller.js";


const router = express.Router()

export default router;

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProdct);