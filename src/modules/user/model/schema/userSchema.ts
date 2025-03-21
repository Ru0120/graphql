import mongoose from "mongoose";
const schema = mongoose.Schema;
import { nanoid } from "nanoid";

export const userSchame = new schema(
  {
    _id: {
      type: String,
      default: nanoid(),
    },
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
