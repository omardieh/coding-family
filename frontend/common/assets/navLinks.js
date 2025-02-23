import { v4 as uuid } from "uuid";

export const guestLinks = [
  { id: uuid(), title: "Welcome", path: "/" },
  { id: uuid(), title: "Tutorials", path: "/tutorials" },
  { id: uuid(), title: "About", path: "/about" },
  { id: uuid(), title: "Contact", path: "/contact" },
  { id: uuid(), title: "Login", path: "/login" },
  { id: uuid(), title: "Register", path: "/register" },
];

export const userLinks = [
  { id: uuid(), title: "Welcome", path: "/" },
  { id: uuid(), title: "Tutorials", path: "/tutorials" },
  { id: uuid(), title: "About", path: "/about" },
  { id: uuid(), title: "Contact", path: "/contact" },
];

export const userAvatarLinks = [
  { id: uuid(), title: "Dashboard", path: "/dashboard" },
  { id: uuid(), title: "Profile", path: "/profile" },
  { id: uuid(), title: "settings", path: "/settings" },
  { id: uuid(), title: "Logout", path: "/logout" },
];

export const tutorialsNavbarLinks = [
  { id: uuid(), title: "Create New Tutorial", path: "/tutorials/create" },
  { id: uuid(), title: "All Tags", path: "/tutorials/tags" },
];

export const tutorialsTagsNavbarLinks = [
  { id: uuid(), title: "Create New Tutorial", path: "/tutorials/create" },
  { id: uuid(), title: "All Tutorials", path: "/tutorials" },
];
