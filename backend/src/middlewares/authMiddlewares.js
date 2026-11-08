import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }

  if (!token) {
    return next(errorHandler(401, "Notauthorizedno token provided"));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(errorHandler(500, "not authorized, token invalid or expired"));
    console.log(error.message);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(errorHandler(401, "not authorized, user no longer exists"));
  }

  req.user = user;
  next();
};
