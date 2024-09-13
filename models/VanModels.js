import mongoose from "mongoose";

const vanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    available: { 
        type: Boolean, 
        default: true 
    },
});

export default mongoose.model("vans", vanSchema)