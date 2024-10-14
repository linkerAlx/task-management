import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: String,
    description: String,
    username: String,
    createdAt: { type: Date, default: Date.now },
});
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export { Task };