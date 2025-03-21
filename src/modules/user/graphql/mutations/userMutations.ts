import { Context } from "../../../../utils/types";
import { Users } from "./../../model/userModel";
export const userMutations = {
  updateProfile: (
    _parent: undefined,
    args: { userName: string; email: string },
    { user }: Context
  ) => {
    const { userName, email } = args;

    const updatedUser = Users.profileUpdate(user.userId, userName, email);

    return updatedUser;
  },
};
