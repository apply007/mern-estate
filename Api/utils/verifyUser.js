import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const Token = req.cookies.access_token;
  if (!Token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(Token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "forbidden"));
    }
    req.user = user;
    next();
  });
};
