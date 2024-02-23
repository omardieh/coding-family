import { v4 as uuid } from "uuid";

export const guestLinks = [
  { id: uuid(), title: "Welcome", path: "/" },
  { id: uuid(), title: "Login / Register", path: "/login" },
];

export const userLinks = [
  { id: uuid(), title: "Welcome", path: "/" },
  { id: uuid(), title: "Dashboard", path: "/dashboard" },
  { id: uuid(), title: "Logout", path: "/logout" },
];
