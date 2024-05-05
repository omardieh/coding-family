import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import LoginForm from "./LoginForm";
import SocialLoginLink from "./SocialLoginLink";
import { useAuthContext } from "/common/contexts/AuthContext";
import { useCaptchaContext } from "/common/contexts/CaptchaContext";
import AuthService from "/common/services/AuthService";
import Loading from "/features/Loading";

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
        const accessToken = response.headers.authorization.split(" ")[1];
        storeToken(accessToken);
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
              Login
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
              to={`/login/github`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
            >
              Login with GitHub
              <FaGithub style={{ fontSize: "2em", marginLeft: ".5em" }} />
            </SocialLoginLink>
            <SocialLoginLink
              to={`/login/google`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
            >
              Login with Google
              <FcGoogle style={{ fontSize: "2em", marginLeft: ".5em" }} />
            </SocialLoginLink>
          </>
        </Box>
      </Grid>
    </Grid>
  );
}
