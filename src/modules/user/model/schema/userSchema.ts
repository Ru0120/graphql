import mongoose from "mongoose";
const schema = mongoose.Schema;

export const userSchame = new schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);
