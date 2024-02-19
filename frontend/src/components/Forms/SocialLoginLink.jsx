import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SocialLoginLink({ to, styleLink, styleButton, icon }) {
  return (
    <>
      <Link to={to} style={{ ...styleLink }}>
        <Button fullWidth variant="contained" style={{ ...styleButton }}>
          Sign In with GitHub
          {icon}
        </Button>
      </Link>
    </>
  );
}
