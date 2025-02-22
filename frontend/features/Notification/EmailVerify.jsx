import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "/common/services/AuthService";
import { Typography } from "@mui/material";

export default function EmailVerify() {
  const [verifyMessage, setVerifyMessage] = useState("");
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userID");
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.verifyEmail({ userID, code, token })
      .then((response) => {
        setVerifyMessage(response.data);
      })
      .catch((error) => {
        if (error.response.data) {
          console.error("AuthService.verifyEmail : ", error.response.data);
          setVerifyMessage(error.response.data);
          return;
        }
        navigate("/");
      });
  }, [userID, token, code, navigate]);

  return (
    <>
      <Typography variant="h6">{verifyMessage}</Typography>
      <Typography variant="body2" color="textSecondary">
        {verifyMessage}
      </Typography>
    </>
  );
}
