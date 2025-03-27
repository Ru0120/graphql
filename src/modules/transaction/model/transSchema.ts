
import mongoose from "mongoose";
import { nanoid } from "nanoid";
const schema = mongoose.Schema;

export const transSchema = new schema(
  {
    _id: {
      type: String,
      default: nanoid(),
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);