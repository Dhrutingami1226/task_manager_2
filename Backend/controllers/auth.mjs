import User from "../models/register.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const validRoles = ['user', 'admin'];
    const userRole = role && validRoles.includes(role) ? role : 'user';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const lastUser = await User.findOne().sort({userId:-1});
    const newUserId = lastUser ? lastUser.userId + 1 : 1;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userId: newUserId,
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

   
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async(req,res)=>{
    try{
        
        const {email,password}= req.body;
         if(!email||!password) return res.status(404).json({message:"All fields required"})

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"Invalid Credentials"})        
      
        const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
        {
            id:user._id, email:user.email, role:user.role
        }, process.env.JWT_SECRET, 
        {expiresIn:"1h"});
     
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 
        });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

        }catch (error){
        res.status(500).json({error:error.message});
    }
    
};

export const logoutUser = async (req, res) => {
    try {

        res.clearCookie("token", { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "development" ? false : true, 
            sameSite: "strict" });

        res.json({ message: "Logout successful" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};