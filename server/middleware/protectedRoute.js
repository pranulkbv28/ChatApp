import jwt from "jsonwebtoken";
import { User } from "../models/!modelExports.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log(decoded);

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decoded.userID).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(401).json({
        error: "No such User Found!!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("ERROR IN PROTECTED_ROUTE!: ", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default protectedRoute;
