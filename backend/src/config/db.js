import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO_DB connected successful");
    } catch (err) {
        console.error("failed to connect MONGO_DB");
    }
};

export default connectDB;