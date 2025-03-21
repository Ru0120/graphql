import mongoose, { Model, Document } from "mongoose";
import { userSchame } from "./schema/userSchema";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}
interface UserModel extends Model<IUser> {
  registerUser({
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;
  }): Promise<IUser>;
  loginUser({
    userName,
    email,
  }: {
    userName: string;
    email: string;
  }): Promise<IUser>;
}

class User {
  registerUser(email: string) {}
  login() {}
}

userSchame.loadClass(User);

export const Users: UserModel = mongoose.model<IUser, UserModel>(
  "User",
  userSchame
);
