import { useEffect, useState } from "react";

import type { User } from "../models/user.model";
import { formatDate } from "../utils/date.utils";
import { sendWelcomeEmail } from "../services/sendNotification.service";
import type { IUserService } from "../models/IUserService";
type UserDashboardProps = {
  userService: IUserService;
};
// Good CODE - follows to  SOLID
export const UserDashboard = ({ userService }: UserDashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const data = await userService.fetchUser();
      setUser(data);
      sendWelcomeEmail(data.email);
      setLoading(false);
    };
    fetchUserDetails();
  }, [userService]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
        )
      )}
    </div>
  );
};
