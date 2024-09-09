import express from "express";
import Product from "../models/product.model.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch(err) {
        res.status(500).json(err);
    }
});

//CREATE MULTIPLE
router.post('/multiple', verifyTokenAndAdmin, async (req, res) => {
    const productDataArray = req.body; // An array of product objects from the request body
  
    // Process each product object and save it to the database
    const savedProducts = [];
  
    for (const productData of productDataArray) {
      try {
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        savedProducts.push(savedProduct);
      } catch (error) {
        console.error('Error creating product:', error);
        continue;
      }
    }
  
    if (savedProducts.length === 0) {
      return res.status(500).json({ message: 'No products were created successfully.' });
    }
  
    res.status(200).json(savedProducts);
});

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
        );

        res.status(200).json(updatedProduct);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET  PRODUCT
router.get("/find/:id", async( req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("The product has been deleted..");
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err);
    }
})


export default router