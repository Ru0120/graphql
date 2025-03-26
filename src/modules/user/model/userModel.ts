import mongoose, { Model } from "mongoose";
import { userSchame } from "./schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

interface UserModel extends Model<IUser> {
  register({
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;}): Promise<Boolean>;
  
    login({
    password,
    email,
  }: {
    password: string;
    email: string;}): Promise<String>;
  
    getProfile(_id: string): Promise<IUser>;
  
    profileUpdate(_id: string, userName: string, email: string): Promise<IUser>;
}

class User {
  static async register(
    this: UserModel,
    {
      email,
      password,
      userName,
    }: {
      email: string;
      password: string;
      userName: string;
    }
  ) {
    const existingUser = await this.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      email,
      userName,
      password: hashedPassword,
    });

    return user ? true : false;
  }

  static async login(
    this: UserModel,
    { email, password }: { email: string; password: string }
  ) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Password was wrong");
    }

    const token = jwt.sign({ userId: user._id }, "token");

    return token;
  }

  static async getProfile(this: UserModel, _id: string) {
    const user = await this.findOne({ _id });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async profileUpdate(
    this: UserModel,
    userId: string,
    userName: string,
    email: string
  ) {
    const user = await this.findOneAndUpdate(
      {
        _id: { $eq: userId },
      },
      { $set: { userName, email } },
      { new: true }
    );

    return user;
  }
}
userSchame.loadClass(User);

export const Users: UserModel = mongoose.model<IUser, UserModel>(
  "User",
  userSchame
);
