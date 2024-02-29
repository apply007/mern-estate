import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { set } from "mongoose";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import { json } from "express";

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
          avatar: req.body.avatar,
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

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(404, "you only delete your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json("User has been deleted")
  } catch (error) {
    next(error);
  }
};


export const getUserListing=async(req,res,next)=>{

  if (req.user.id===req.params.id) {
    try {
    const listing =await Listing.find({userRef:req.params.id})
    res.status(200).json(listing)
    } catch (error) {
      
    }
  }else{
    return next(errorHandler(401,"You can only view your own listing"))
  }



}


export const getUser=async(req,res,next)=>{
try {
  const user=await User.findById(req.params.id)
  if (!user) {
  return next(errorHandler(404,"user not found"))
    
  }
  
  const {password:pass,...rest}=user._doc
  
  res.status(200).json(rest)
} catch (error) {
  return next(error.message)
}

}