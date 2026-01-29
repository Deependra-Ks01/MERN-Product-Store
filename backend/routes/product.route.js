import express from "express";

import {deleteProduct, updateProduct, createProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Define your product routes here
router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;