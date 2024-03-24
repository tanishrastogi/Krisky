import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.json(new ApiError(401, "Unauthorized Request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //This decoded token has the information declared in user.model.js in generateAccessToken method
    //in which we gave 4 parameters _id

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.json(new ApiError(401, "Invalid Access Token"));
    }
    req.user = user;

    next();
  } catch (error) {
    return res.json(new ApiError(401, "Invalid Access Token"));
  }
};
