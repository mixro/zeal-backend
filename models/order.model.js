import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String },
                title: { type: String },
                desc: { type: String },
                size: { type: String },
                price: { type: Number },
                img: { type: String },
                type: { type: String },
                brand: { type: String },
                status: { type: String },
                inStock: { type: String },
                quantity: { type: Number, default: 1}
            },
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        phoneNumber: { type: String },
        name: { type: String },
        email: { type: String },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);