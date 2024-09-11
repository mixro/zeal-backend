import express from "express";
import { verifyTokenAndAdmin } from "../zeal-backend/routes/verifyToken.js";
import Service from "../models/service.model.js";

const router = express.Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newService = new Service(req.body);

    try {
        const savedService = await newService.save();

        res.status(200).json(savedService);
    } catch(err) {
        res.status(500).json(err);
    }
});

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
        );

        res.status(200).json(updatedService);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET  SERVICE
router.get("/find/:id", async( req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json("The service has been deleted..");
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET SERVICES
router.get("/", async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch(err) {
        res.status(500).json(err);
    }
})


export default router