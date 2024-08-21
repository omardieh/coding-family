import { AppBar, Toolbar } from "@mui/material";
import AvatarMenu from "./AvatarMenu";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import {
  guestLinks,
  userAvatarLinks,
  userLinks,
} from "/common/assets/navLinks";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function Header({ mode, setMode }) {
  const { isLoggedIn, logUserOut } = useAuthContext();

  return (
    <AppBar
      sx={{
        width: "100%",
        background: (theme) => theme.colors.white.bg.dark,
      }}
      component="header"
    >
      <Toolbar>
        <Navbar navLinks={isLoggedIn ? userLinks : guestLinks}>
          {isLoggedIn && (
            <AvatarMenu navLinks={userAvatarLinks} handleClick={logUserOut} />
          )}
          <ThemeToggle
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            label={mode}
          />
        </Navbar>
      </Toolbar>
    </AppBar>
  );
}
