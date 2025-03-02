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
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "/common/components";

export const RegisterForm = ({
  handleSubmit,
  errorMessage,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="passRepeat"
          label="Repeat Password"
          name="passRepeat"
          autoComplete="passRepeat"
          type={showPassword ? "text" : "password"}
          autoFocus
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
        <Alert style={{ width: "100%", marginTop: "2em" }} severity="error">
          {errorMessage}
        </Alert>
      )}
    </>
  );
};
