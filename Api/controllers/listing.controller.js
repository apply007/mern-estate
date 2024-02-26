import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
 
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  
    try {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, "No listing Found"));
  }
  if (req.user.id !== listing.userRef) {
    next(errorHandler(401, "Not authenticated user"));
  }
  
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  
    try {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, "No listing Found"));
  }
  if (req.user.id !== listing.userRef) {
    next(errorHandler(401, "Not authenticated user"));
  }

  
   const updatedListing= await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json("Updated successfully");
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next) => {
  
    try {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, "No listing Found"));
  }  

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
