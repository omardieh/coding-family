import { useEffect } from "react";
import { Button, Box, Typography, Link } from "@material-ui/core";
import { useAuthContext } from "/common/contexts/AuthContext";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function Profile() {
  const { user, getUserInfo } = useAuthContext();

  useEffect(() => {
    getUserInfo();
  }, []);
  const {
    username,
    email,
    avatar,
    country,
    bio,
    socialMedia: { facebook, linkedin, twitter },
    website,
    following,
    followers,
  } = user;

  return (
    <Box
      component="section"
      noValidate
      sx={{
        mt: 2,
        p: 4,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: 1,
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginBottom: 2,
        }}
      >
        <Box
          style={{
            maxWidth: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <Box
            component={"img"}
            alt={username}
            src={avatar}
            style={{
              width: "100%",
              maxHeight: "15em",
              objectFit: "cover",
              borderRadius: "2em",
            }}
          />
          <Typography
            variant="h6"
            style={{ textAlign: "center", margin: ".5em 0" }}
          >
            Hello, {username}!
          </Typography>
          <Box>
            <Typography
              variant="subtitle2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocationOnIcon sx={{ fontSize: "1em", marginRight: ".5em" }} />
              {country}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <AlternateEmailIcon
                sx={{ fontSize: "1em", marginRight: ".5em" }}
              />
              {email}
            </Typography>
          </Box>
          {(facebook || twitter || linkedin || website) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "1em",
              }}
            >
              {facebook && (
                <Typography paragraph sx={{ marginBottom: 1 }}>
                  <Link
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                  </Link>
                </Typography>
              )}
              {twitter && (
                <Typography paragraph sx={{ marginBottom: 1 }}>
                  <Link
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon />
                  </Link>
                </Typography>
              )}
              {linkedin && (
                <Typography paragraph sx={{ marginBottom: 1 }}>
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </Link>
                </Typography>
              )}
              {website && (
                <Typography paragraph sx={{ marginBottom: 1 }}>
                  <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LanguageIcon />
                  </Link>
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box sx={{ maxWidth: "40%" }}>
          {bio && (
            <>
              <Typography variant="h5" style={{ marginBottom: ".5em" }}>
                About
              </Typography>
              <Typography paragraph>{bio}</Typography>

              <Typography paragraph> Following: {following.length}</Typography>
              <Typography paragraph> Followers: {followers.length}</Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "3em",
            }}
          >
            <NavLink
              to="/profile/edit"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "auto",
              }}
            >
              Edit Profile Info
            </NavLink>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
