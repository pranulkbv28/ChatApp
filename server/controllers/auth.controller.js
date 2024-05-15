import { User } from "../models/!modelExports.js";
import bcryptjs from "bcryptjs";

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

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("ERROR IN SIGNUP!: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // You need to add your login logic here
  } catch (error) {
    console.log("ERROR IN LOGIN!: ", error);
  }
};

export const logOutUser = (req, res) => {
  console.log("We will be waiting for you! 🤧");
  // You need to add your logout logic here
};
