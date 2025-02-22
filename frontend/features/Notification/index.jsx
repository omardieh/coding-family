import { Box } from "@mui/material";
import EmailVerify from "./EmailVerify";

export default function Notification() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          top: "4em",
        }}
      >
        <EmailVerify />
      </Box>
    </>
  );
}
