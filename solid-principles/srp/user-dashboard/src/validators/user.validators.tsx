import type { User } from "../models/user.model";

export const validateUser = (user: User) => {
  if (!user.name) return false;
  if (!user.email.includes("@")) return false;
  return true;
};
