import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    isGuest: { type: Boolean, default: false },
  },
  { timestamps: true } // member since <createdAt>
);

const User = mongoose.model("User", userSchema);

export default User;
