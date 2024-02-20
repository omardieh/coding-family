import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCaptchaContext } from "../../contexts/CaptchaContext";
import AuthService from "../../services/AuthService";
import LoginForm from "../../components/Forms/LoginForm";
import SocialLoginLink from "./../../components/Forms/SocialLoginLink";
import Loading from "./../../components/Loading/index";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { storeToken, authenticateUser } = useAuthContext();
  const { isVerified, isLoading: captchaLoading } = useCaptchaContext();

  useEffect(() => {
    if (!isVerified && !captchaLoading) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
    } else {
      setErrorMessage(null);
    }
  }, [isVerified, captchaLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setErrorMessage(
        "Please ensures that the password contains at least one uppercase letter, one number, and 6 characters long."
      );
      return;
    }

    AuthService.login({ email, password })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.error("AuthService.login : ", error);
        setErrorMessage(error.response.data);
      });
  };

  if (captchaLoading) return <Loading />;

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
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </>
          <>
            <LoginForm
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          </>
          <>
            <SocialLoginLink
              to={`${import.meta.env.VITE_SERVER_URL}/auth/github`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
              icon={<FaGithub />}
            />
            <SocialLoginLink
              to={`${import.meta.env.VITE_SERVER_URL}/auth/google`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
              icon={<FcGoogle />}
            />
          </>
        </Box>
      </Grid>
    </Grid>
  );
}
