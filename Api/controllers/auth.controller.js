import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

import jsonwebtoken from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });
  try {
    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User Not Found"));
    }
    var validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "wrong credentials"));
    }

    const token = jsonwebtoken.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );

    const {password:pass,...rest}=validUser._doc
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);

  } catch (error) {
    next(error);
  }
};
