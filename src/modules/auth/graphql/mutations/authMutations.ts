import jwt from "jsonwebtoken";
export const authMutations = {
  login: (
    _parent: undefined,
    { username, password }: { username: string; password: string }
  ) => {
    const token = jwt.sign({ user: { firstname: "1" } }, "secret");
    return token;
  },
};
