import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: String,
        default: "user",
    }
})

const User = mongoose.model("User", userSchema);

export default User;