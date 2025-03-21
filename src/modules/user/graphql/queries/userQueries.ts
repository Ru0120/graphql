import { Context } from "../../../../utils/types";
import { Users } from "../../model/userModel";

export const userQueries = {
  getProfile: async (__: undefined, _: undefined, { user }: Context) => {
    const profile = await Users.getProfile(user.userId);

    return profile;
  },
};
