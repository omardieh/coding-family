import { Container, Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4, 0),
  },
  socialIcons: {
    "& > *": {
      margin: theme.spacing(0, 1),
    },
  },
}));

export default function Footer({ title }) {
  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
      component={"footer"}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "1em 0",
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Copyright © 2024 Your Company</Typography>
            <Typography variant="body2">All rights reserved.</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
            xs={12}
            sm={6}
            md={4}
          >
            <Typography variant="h6">Quick Links</Typography>
            <Link href="#">Home</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Contact Us</Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
          >
            <Typography style={{ marginRight: ".5em" }} variant="h6">
              Connect with Us
            </Typography>
            <div className={classes.socialIcons}>
              <IconButton
                color="inherit"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
