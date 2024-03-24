import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const mobileSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: mobileSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "banned"],
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hashing the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Generating Access and Refresh Token method

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

//Password Validation Method

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.addToList = async function (listID, productID) {
  try {
    const index = this.wishlist.findIndex((item) => {
      return item["_id"].equals(listID);
    });
    console.log(index);
    if (index === -1) {
      throw new ApiError(404, "list not found");
    } else {
      const itemIndex = this.wishlist[index]["listItems"].findIndex((item) => {
        return item.equals(productID);
      });
      if (itemIndex !== -1) {
        throw new ApiError(422, "Product already present");
      } else {
        this.wishlist[index]["listItems"] =
          this.wishlist[index]["listItems"].concat(productID);
        await this.save();
        return this.wishlist[index];
      }
    }
  } catch (err) {
    throw new ApiError(400, "error adding to list", err);
  }
};

userSchema.methods.removeList = async function (listID) {
  try {
    const index = this.wishlist.findIndex((item) => {
      return item["_id"].equals(listID);
    });
    if (index === -1) {
      throw new ApiError(400, "invalid list id");
    } else {
      this.wishlist = this.wishlist.filter((item) => {
        return item["_id"] !== this.wishlist[index]["_id"];
      });
      await this.save();
      return this.wishlist;
    }
  } catch (err) {
    throw new ApiError(400, "error deleting the list", err);
  }
};

userSchema.methods.removeProductFromList = async function (listID, productID) {
  try {
    const listIndex = this.wishlist.findIndex((item) => {
      return item["_id"].equals(listID);
    });

    console.log(listIndex);
    const productIndex = this.wishlist[listIndex]["listItems"].findIndex(
      (item) => {
        return item["_id"].equals(productID);
      }
    );

    if (listIndex !== -1) {
      if (productIndex !== -1) {
        this.wishlist[listIndex]["listItems"] = this.wishlist[listIndex][
          "listItems"
        ].filter((item) => {
          console.log(item["_id"], productID);
          return (
            item["_id"] !== this.wishlist[listIndex]["listItems"][productIndex]
          );
        });
      }
      await this.save();
      return this.wishlist[listIndex];
    }
  } catch (err) {
    throw new ApiError(400, "error removing the product from the list", err);
  }
};

export const User = mongoose.model("User", userSchema);
