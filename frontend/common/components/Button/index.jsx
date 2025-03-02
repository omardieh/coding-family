import { Button as MuiButton } from "@mui/material";

export const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 5,
        padding: "1.2em 0",
        maxWidth: "calc(100% - 2em)",
        margin: "2em 1em",
        background: (theme) => theme.colors.black.bg.mid,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
