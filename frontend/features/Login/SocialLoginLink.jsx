import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SocialLoginLink({
  to,
  styleLink,
  styleButton,
  children,
}) {
  return (
    <>
      <Link to={to} style={{ ...styleLink, padding: "0 1em" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ background: (theme) => theme.colors.black.bg.mid }}
          style={{ ...styleButton }}
        >
          {children}
        </Button>
      </Link>
    </>
  );
}
