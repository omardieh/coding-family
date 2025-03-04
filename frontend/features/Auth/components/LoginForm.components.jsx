import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "/common/components";

export const LoginForm = ({ handleSubmit, errorMessage }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Input
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <Input
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button>Login</Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
      {errorMessage && (
        <Alert
          style={{ width: "100%", marginTop: "2em" }}
          severity="error"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(211, 47, 47, 0.1)"
                : undefined,
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
};
