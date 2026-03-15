import jwt from "jsonwebtoken";
import User from "../models/register.mjs";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }
    
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, please login"
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    next();
  };
};
