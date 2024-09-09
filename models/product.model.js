import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true},
        img: { type: String, required: true },
        categories: { type: Array },
        price: { type: Number, required: true },
        type: {type: String, required: true },
        brand: {type: String},
        rating: { type: Number },
        status: { type: Boolean },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true}
);

export default mongoose.model("Product", productSchema);