import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
//   const existingUser = await User.findOne({ userName });
//   if (existingUser) {
//     return res.status(400).json({ message: "Username is already taken" });
//   }


  //console.log(req.body)
  const { userName, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });
  try {
    await newUser.save();

  res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json(error.message)
  }
  
};
