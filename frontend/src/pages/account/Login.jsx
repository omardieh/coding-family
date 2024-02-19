import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCaptchaContext } from "../../contexts/CaptchaContext";
import AuthService from "../../services/AuthService";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { storeToken, authenticateUser } = useAuthContext();
  const { isVerified } = useCaptchaContext();

  useEffect(() => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
    }
  }, [isVerified]);
  console.log(isVerified);

  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }

    AuthService.login({ email, password })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data);
      });
  };

  const handleLoginGithub = () => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`;
  };

  const handleLoginGoogle = () => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
                      onClick={handleShowPassword}
                      onMouseDown={handleShowPassword}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ padding: "1em 0" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {errorMessage && (
            <Alert style={{ width: "100%", marginTop: "2em" }} severity="error">
              {errorMessage}
            </Alert>
          )}
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link
            to={{ path: `${import.meta.env.VITE_SERVER_URL}/auth/github` }}
            style={{ width: "100%" }}
          >
            <Button fullWidth variant="contained" style={{ padding: "1em 0" }}>
              Sign In with GitHub
              <FaGithub />
            </Button>
          </Link>
          <Link
            to={{ path: `${import.meta.env.VITE_SERVER_URL}/auth/github` }}
            style={{ width: "100%" }}
          >
            <Button
              fullWidth
              variant="contained"
              style={{ padding: "1em 0", marginTop: "2em" }}
            >
              Sign In with Google
              <FcGoogle />
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );

  // return (
  //   <CARD>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //           <LockOutlinedIcon />
  //         </Avatar>
  //         <Typography component="h1" variant="h5">
  //           Login
  //         </Typography>
  //         <Box
  //           component="form"
  //           onSubmit={handleSubmit}
  //           noValidate
  //           sx={{ mt: 1 }}
  //         >
  //           <TextField
  //             margin="normal"
  //             required
  //             fullWidth
  //             id="email"
  //             label="Email Address"
  //             name="email"
  //             autoComplete="email"
  //             autoFocus
  //           />
  //           <TextField
  //             margin="normal"
  //             required
  //             fullWidth
  //             name="password"
  //             label="Password"
  //             type="password"
  //             id="password"
  //             autoComplete="current-password"
  //           />
  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             sx={{ mt: 3, mb: 2 }}
  //           >
  //             Login
  //           </Button>
  //           <Grid container justifyContent="flex-end">
  //             <Grid item>
  //               <Link to="/register" variant="body2">
  //                 {"Don't have an account? Sign Up"}
  //               </Link>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //     </Container>
  //     <SEPARATOR />
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         rowGap: "1em",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flexBasis: "45%",
  //         padding: "1em",
  //       }}
  //     >
  //       <p style={{ width: "100%", textAlign: "center", marginBottom: "1em" }}>
  //         Login using Google or Github account
  //       </p>
  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="light"
  //         sx={{ mt: 3, mb: 2 }}
  //         onClick={handleLoginGoogle}
  //       >
  //         Sign in with Google
  //         <FcGoogle />
  //       </Button>
  //       <Button
  //         fullWidth
  //         variant="dark"
  //         sx={{ mt: 3, mb: 2 }}
  //         onClick={handleLoginGithub}
  //       >
  //         Sign in with Github <FaGithub />
  //       </Button>
  //     </div>
  //   </CARD>
  // );

  // return (
  //   <>
  //     <h2>Login to your Account</h2>
  //     <CARD>
  //       <Form
  //         title="Let's get you started 🚀"
  //         description="To begin, just drop in your email and password"
  //         onSubmit={handleLoginSubmit}
  //         onSubmitLabel="Sign in using Email"
  //         error={errorMessage}
  //         linkText="Don't have an account yet? Please"
  //         linkUnderlined="Sign Up Here"
  //         linkPath="/account/register"
  //       >
  //         <Input
  //           type="email"
  //           name="email"
  //           label="email"
  //           placeholder="address@example.com"
  //           value={email}
  //           onChange={(event) => onChangeHandler(event.target.value, setEmail)}
  //         />
  //         <Input
  //           type="password"
  //           name="password"
  //           label="password"
  //           placeholder="******"
  //           value={password}
  //           onChange={(event) =>
  //             onChangeHandler(event.target.value, setPassword)
  //           }
  //           enableShowPass
  //         />
  //         <b />
  //       </Form>
  //       <SEPARATOR />
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           rowGap: "1em",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           flexBasis: "45%",
  //           padding: "1em",
  //         }}
  //       >
  //         <p
  //           style={{ width: "100%", textAlign: "center", marginBottom: "1em" }}
  //         >
  //           Login using Google or Github account
  //         </p>
  //         <Button
  //           onClick={handleLoginGoogle}
  //           variant="light"
  //           icon={<FcGoogle />}
  //         >
  //           Sign in with Google
  //         </Button>
  //         <Button
  //           onClick={handleLoginGithub}
  //           variant="dark"
  //           icon={<FaGithub />}
  //         >
  //           Sign in with Github
  //         </Button>
  //       </div>
  //     </CARD>
  //   </>
  // );
}
