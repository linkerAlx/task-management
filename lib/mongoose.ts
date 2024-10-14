import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        console.log("MONGODB_URL not fount");
        return;
    };

    if (isConnected) {
        console.log('Already connected to MongoDB');
        return
    };

    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log('MongoDB connected successfully'))
            .catch((error) => console.error('MongoDB connection error', error));
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        throw new Error("MongoDB connect failed");
    };
};
