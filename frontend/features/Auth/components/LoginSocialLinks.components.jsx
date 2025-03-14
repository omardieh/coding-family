import { Link } from "react-router-dom";
import { Button } from "/common/components";

export const SocialLoginLink = ({ to, styleLink, styleButton, children }) => {
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
};
