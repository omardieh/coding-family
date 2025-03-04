import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const AuthFormLayout = ({ children, ...props }) => {
  const newUser = {
    icon: <PersonAddIcon />,
    image: "/common/assets/images/register-hero.png",
    title: "Register",
    welcomeTitle: "Join Our Community",
    welcomeDescription:
      "Create an account to access tutorials, share your knowledge, and connect with other developers.",
  };

  const existingUser = {
    icon: <LoginIcon />,
    image: "/common/assets/images/login-hero.png",
    title: "Login",
    welcomeTitle: "Welcome Back",
    welcomeDescription:
      "Sign in to access your account, manage your tutorials, and continue your learning journey.",
  };

  const { icon, image, title, welcomeTitle, welcomeDescription } =
    props.isNewAccount ? newUser : existingUser;

  return (
    <>
      <Grid container name="AuthFormLayout">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 4,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              color="white"
              fontWeight="bold"
              sx={{ mb: 2, fontSize: { sm: "1.5em", md: "3em" } }}
            >
              {welcomeTitle}
            </Typography>
            <Typography variant="h6" color="white" sx={{ maxWidth: "80%" }}>
              {welcomeDescription}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            bgcolor: "background.paper",
            transition: "background-color 0.3s ease",
          }}
        >
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{icon}</Avatar>
              <Typography component="h1" variant="h5" color="text.primary">
                {title}
              </Typography>
            </>
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
