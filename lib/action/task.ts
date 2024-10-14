"use server";

import { Task } from "../models/task";
import { connectDB } from "../mongoose";

export const getAllTasks = async () => {
    await connectDB();

    try {
        const tasks = await Task.find().lean();
        return tasks;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteTask = async (productId: string) => {
    await connectDB();

    const product = await Task.findById(productId);
    if (!product) {
        console.log("Task not found");
        return null;
    }

    try {
        await Task.findByIdAndDelete(productId);
        return console.log("tasks deleted");
    } catch (error) {
        console.error(error);
        return null;
    }
};
