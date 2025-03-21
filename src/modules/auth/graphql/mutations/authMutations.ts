import { Users } from "../../../user/model/userModel";

export const authMutations = {
  register: async (
    parent: undefined,
    args: {
      email: string;
      password: string;
      userName: string;
    }
  ) => {
    console.log(args);

    return await Users.register(args);
  },
  login: async (
    parent: undefined,
    args: {
      email: string;
      password: string;
    }
  ) => {
    return await Users.login(args);
  },
};
