import { errorHandler } from "../libs/error.js";
import { generateToken } from "../libs/generateToken.js";
import User from "../models/User.js";

const toClientUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  company: user.company,
  avater: user.avater,
  createdAt: user.createdAt,
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (
      !name ||
      name === "" ||
      !email ||
      email === "" ||
      !password ||
      password === ""
    ) {
      return next(errorHandler(400, " All fileds are rquired"));
    }

    const exists = await User.findOne({ email: email.toLowerCase() });

    if (exists) {
      return next(
        errorHandler(409, "an account with this email already exists"),
      );
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: toClientUser(user),
    });

    console.log(generateToken(user._id));
  } catch (error) {
    next(errorHandler(400, error.message));
    console.log(error);
  }
};
