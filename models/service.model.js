import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);