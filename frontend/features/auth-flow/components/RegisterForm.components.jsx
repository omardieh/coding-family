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

export const RegisterForm = ({
  registerFormData,
  handleRegisterSubmit,
  handleRegisterInput,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { username, email, password, passRepeat } = registerFormData;

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleRegisterSubmit}
        sx={{ mt: 1 }}
      >
        <Input
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={handleRegisterInput}
          autoFocus
        />
        <Input
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleRegisterInput}
        />
        <Input
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handleRegisterInput}
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
        <Input
          id="passRepeat"
          label="Repeat Password"
          name="passRepeat"
          autoComplete="passRepeat"
          value={passRepeat}
          onChange={handleRegisterInput}
          type={showPassword ? "text" : "password"}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button>Register</Button>
        <Grid container>
          <Grid style={{ margin: "auto" }} item>
            <Link to="/login" variant="body2">
              {"Already have an account? Login"}
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
          {JSON.stringify(errorMessage)}
        </Alert>
      )}
    </>
  );
};
