import { UserEditProfile } from "./UserEditProfile.page";
import { UserProfile } from "./UserProfile.page";
import { UserDashboard } from "./UserDashboard.page";

export default [
  {
    path: "/dashboard",
    element: <UserDashboard />,
    scope: "user",
  },
  {
    path: "/profile",
    element: <UserProfile />,
    scope: "user",
    children: [
      {
        path: "/profile/edit",
        element: <UserEditProfile />,
        scope: "user",
      },
    ],
  },
];
