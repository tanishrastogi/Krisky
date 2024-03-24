import { User } from "../models/user.models.js";
import { Otp } from "../models/otp.models.js";
import { ApiError, handleErr } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { transporter } from "../utils/transporter.js";
import bcrypt from "bcrypt";
import { client, TWILIO_SERVICE_SID } from "../utils/twilio.js";
import { Admin } from "../models/admin.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    return res.json(new ApiError(400, "Error generating token! ", err));
  }
};

const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // Delete all previous otps for the user
    await Otp.deleteMany({ email });
    const user = await User.findOne({ email });
    if (user) {
      return res.json(new ApiResponse(409, "User already exists!"));
    }
    // Generate a new otp
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: {
        name: process.env.AUTH_EMAIL_NAME,
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: "Verify your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup</p><p>This otp expires in 10 minutes.</p>`,
    };

    const hashedOtp = await bcrypt.hash(otp, 12);
    const newOtp = new Otp({
      email,
      otp: hashedOtp,
    }).save();
    transporter.sendMail(mailOptions);
    return res.status(200).json(new ApiResponse(200, "Otp sent successfully"));
  } catch (err) {
    console.log(err);
    return res.json(new ApiError(400, err.message));
  }
};

const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json(new ApiResponse(410, "All fields are required!"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json(new ApiResponse(409, "User already exists!"));
    }
    const hashedOtp = await Otp.findOne({ email });
    if (!hashedOtp) {
      return res.json(new ApiResponse(404, "Otp not found"));
    }
    const { createdAt } = hashedOtp;
    if (createdAt < Date.now() - 600000) {
      return res.json(
        new ApiResponse(422, "Otp has expired , please request again")
      );
    }
    const verify = bcrypt.compareSync(otp, hashedOtp.otp);

    if (verify) {
      await Otp.deleteOne({ email });
      return res.json(new ApiResponse(200, "Email verified successfully"));
    } else {
      return res.json(new ApiResponse(400, "Otp entered is wrong"));
    }
  } catch (err) {
    // console.log(err);
    return res.json(new ApiError(400, "verification failed", err.message));
  }
};

const sendMobileOtp = async (req, res) => {
  const { countryCode, mobile } = req.body;
  try {
    const user = await User.findOne({
      "mobile.number": mobile,
      "mobile.countryCode": countryCode,
    });
    if (user) {
      return res.json(new ApiResponse(409, "User already exists!"));
    }
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `${countryCode}${mobile}`,
        channel: "sms",
      });

    return res.json(new ApiResponse(200, otpResponse, "Mobile otp sent"));
  } catch (error) {
    return res.json(new ApiError(400, "Error sending mobile otp ", error));
  }
};

const verifyMobileOtp = async (req, res) => {
  const { countryCode, mobile, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${countryCode}${mobile}`,
        code: otp,
      });
    return res
      .status(200)
      .json(
        new ApiResponse(200, verifiedResponse, "Mobile verified successfully")
      );
  } catch (error) {
    return res.json(new ApiError(400, "Error verifying mobile ", error));
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, mobile, password, countryCode } = req.body;
    if (!username || !email || !mobile || !password || !countryCode) {
      return res.json(new ApiResponse(410, "All fields are required!"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json(new ApiResponse(409, "User already exists!"));
    }
    const newUser = await User.create({
      username,
      email,
      mobile: {
        countryCode,
        number: mobile,
      },
      password,
    });

    const admin = await Admin.findOne({ email });
    if (admin) {
      newUser.role = "admin";
      await newUser.save();
    }
    return res.json(
      new ApiResponse(201, newUser, "User registered successfully!")
    );
  } catch (error) {
    res.json(
      new ApiError(400, error?.message || "Error registering user ", error)
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.json(new ApiResponse(410, "All fields are required!"));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json(new ApiError(404, "User does not exist!"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json(new ApiError(401, "Password incorrect!"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error logging in user ", err));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    if (req.user) {
      return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User found successfully!"));
    } else {
      return res.status(401).json(new ApiError(401, "User Not Found"));
    }
  } catch (err) {
    res.json(new ApiError(400, "Error getting user "));
  }
};

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { refreshToken: "" },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "You have been logged out successfully"));
  } catch (error) {
    res.json(new ApiError(400, "An error occured during logout"));
  }
};

const findByID = async (req, res) => {
  const { userID } = req.body;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.json(new ApiResponse(404, "user not found"));
    }
    return res.json(new ApiResponse(200, user, "User Found"));
  }
  catch (err) {
    return res.json(new ApiError(400 , err.message));
  }
}

const findByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.json(new ApiResponse(404, "user not found"));

    return res.json(
      new ApiResponse(200, { data: user, status: "found" }, "user found")
    );
  } catch (err) {
    return handleErr(res, err);
  }
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  findByID,
  findByEmail,
  sendEmailOtp,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
};
