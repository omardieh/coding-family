import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AuthService from "../../services/AuthService";
import RegisterForm from "../../components/Forms/RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, email, password, passRepeat } = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      passRepeat: data.get("passRepeat"),
    };

    const validateInputs = () => {
      if (!validator.matches(username, /^[a-zA-Z0-9_.]{6,}$/)) {
        setErrorMessage(
          "Usernames can only use letters, numbers, underscores, periods, and 6 characters long."
        );
        return;
      }

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

      if (password !== passRepeat) {
        setErrorMessage("Passwords do not match");
        return;
      }
      return true;
    };

    if (validateInputs() === undefined) {
      return;
    }

    AuthService.signup({ username, email, password })
      .then((response) => {
        if (response.status === 200) {
          navigate("/account/login");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
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
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
          </>
          <>
            <RegisterForm
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          </>
        </Box>
      </Grid>
    </Grid>
  );
}
