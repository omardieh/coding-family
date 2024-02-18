import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        {props.brandName}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
