import type { IUserService } from "../models/IUserService";
import type { User } from "../models/user.model";

export class UserService implements IUserService {
  fetchUser = async (): Promise<User> => {
    const res = await fetch("https://api.example.com/user/1");
    const data = await res.json();
    return data;
  };
}
