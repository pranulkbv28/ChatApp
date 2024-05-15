import { User } from "../models/!modelExports.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUpUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match!!",
      });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({
        error: "Username already exists!!",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid User Data!!",
      });
    }
  } catch (error) {
    console.log("ERROR IN SIGNUP!: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("ERROR IN LOGIN!: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logOutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged Out Successfull!!",
    });
  } catch (error) {
    console.log("ERROR IN LOGOUT!: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
