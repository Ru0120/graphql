export interface User {
  email: string;
  password: string;
  userName: string;
}

export interface Context {
  user: User;
}
