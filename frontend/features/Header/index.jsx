import { AppBar, Toolbar } from "@mui/material";
import AvatarMenu from "./AvatarMenu";
import Navbar from "./Navbar";
import {
  guestLinks,
  userLinks,
  userAvatarLinks,
} from "/common/assets/navLinks";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function Header() {
  const { isLoggedIn, logOutUser } = useAuthContext();

  return (
    <AppBar component="header">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Navbar navLinks={isLoggedIn ? userLinks : guestLinks}>
          {isLoggedIn && (
            <AvatarMenu navLinks={userAvatarLinks} handleClick={logOutUser} />
          )}
        </Navbar>
      </Toolbar>
    </AppBar>
  );
}
