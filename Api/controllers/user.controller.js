import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { set } from "mongoose";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json(console.log({ message: "Api route is working" }));
};

export const updateUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {

    return next(errorHandler(401, "you can update only your own account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
