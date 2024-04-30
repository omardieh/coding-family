import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: ({ colors: { blue } }) => blue.mid,
        color: ({ colors: { white } }) => white.light,
        padding: "1em 2em",
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
        },
        justifyContent: {
          xs: "center",
          sm: "space-between",
          md: "space-between",
          lg: "space-between",
        },
        alignItems: "center",
        flexWrap: "wrap",
        zIndex: 1,
      }}
    >
      <Typography variant="body2" sx={{}}>
        © 2024 {document.title}. All rights reserved.
      </Typography>
      <Box
        sx={{
          width: "fit-content",
          "& > *": {
            margin: (theme) => theme.spacing(0.5),
          },
        }}
      >
        <IconButton color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit">
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
