import { AppBar, Toolbar } from "@mui/material";
import AvatarMenu from "./AvatarMenu";
import Navbar from "./Navbar";
import {
  guestLinks,
  userAvatarLinks,
  userLinks,
} from "/common/assets/navLinks";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function Header() {
  const { isLoggedIn, logUserOut } = useAuthContext();

  return (
    <AppBar
      sx={{ width: "100%", background: (theme) => theme.colors.blue.mid }}
      component="header"
    >
      <Toolbar>
        <Navbar navLinks={isLoggedIn ? userLinks : guestLinks}>
          {isLoggedIn && (
            <AvatarMenu navLinks={userAvatarLinks} handleClick={logUserOut} />
          )}
        </Navbar>
      </Toolbar>
    </AppBar>
  );
}
