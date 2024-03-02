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
    <AppBar sx={{ width: "100%" }} component="header">
      <Toolbar>
        <Navbar navLinks={isLoggedIn ? userLinks : guestLinks}>
          {isLoggedIn && (
            <AvatarMenu navLinks={userAvatarLinks} handleClick={logOutUser} />
          )}
        </Navbar>
      </Toolbar>
    </AppBar>
  );
}
