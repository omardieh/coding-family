import { TextField } from "@mui/material";

export const Input = (props) => {
  return (
    <TextField
      //   id="email"
      //   label="Email Address"
      //   name="email"
      //   autoComplete="email"
      margin="normal"
      required
      fullWidth
      autoFocus
      sx={{
        "& .MuiInputBase-root": {
          bgcolor: "background.default",
          color: "text.primary",
        },
        "& .MuiInputLabel-root": {
          color: "text.secondary",
        },
      }}
      {...props}
    />
  );
};
