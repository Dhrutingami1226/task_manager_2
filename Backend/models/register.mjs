import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    userId :{
        type: Number,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"] 
    },
    password:{
      type: String,
      required: true,
      minlength: 6
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }


}, {timestamps: true});

export default mongoose.model("User", registerSchema);