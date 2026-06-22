// import { useEffect, useState } from "react";

// // BAD CODE - Violates SOLID
// export const UserDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetches user from API
//   const fetchUser = async () => {
//     setLoading(true);
//     const res = await fetch("https://api.example.com/user/1");
//     const data = await res.json();
//     setUser(data);
//     setLoading(false);
//   };

//   // Validates user data
//   const validateUser = (user: any) => {
//     if (!user.name) return false;
//     if (!user.email.includes("@")) return false;
//     return true;
//   };

//   // Formats date
//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString();
//   };

//   // Sends welcome email
//   const sendWelcomeEmail = (email: string) => {
//     console.log(`Sending welcome email to ${email}`);
//   };

//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <h1>{user?.name}</h1>
//           <p>{user?.email}</p>
//           <p>{formatDate(user?.createdAt)}</p>
//         </div>
//       )}
//     </div>
//   );
// };
