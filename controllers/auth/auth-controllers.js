import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: 'User Already exists with the same email! Try Logging in',
      });

    const hashPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcryptjs.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

  const token = jwt.sign(
    {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
      userName: checkUser.userName,
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "1d" }
  );
  
  // Set cookie to expire in 1 day (1 day in milliseconds = 24 * 60 * 60 * 1000)
 // Login function (setting the cookie)
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // Use secure since you're using HTTPS in production
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  sameSite: "None", // Required for cross-domain cookies
  //domain: ".netlify.app", // Use the parent domain of your frontend
  path: "/", // Ensure path is '/' to cover the entire domain
}).json({
  success: true,
  message: "Logged in successfully",
  user: {
    email: checkUser.email,
    role: checkUser.role,
    id: checkUser._id,
    userName: checkUser.userName,
  },
  });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Matches how the cookie was set
    sameSite: "None", // Matches the SameSite policy
    //domain: ".netlify.app", // Matches the domain where the cookie was set
    path: "/", // Ensure path is '/' to clear across the domain
  }).json({
    success: true,
    message: "Logged out successfully!",
  });
};


//auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

export default { registerUser, loginUser, logoutUser, authMiddleware };
