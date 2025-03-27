import { User } from "./types";

export const checkLogin = (user: User) => {
  if (!user) {
    throw new Error("Please login!!! ");
  }
};