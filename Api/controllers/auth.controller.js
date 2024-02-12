import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {

  const { userName, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });
  try {
    await newUser.save();

  res.status(201).json({ message: "user created successfully" });
  } catch (error) {
   next(error)
  }
  
};
