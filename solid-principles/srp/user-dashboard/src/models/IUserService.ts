import type { User } from "./user.model";

export interface IUserService {
  fetchUser(): Promise<User>;
}
