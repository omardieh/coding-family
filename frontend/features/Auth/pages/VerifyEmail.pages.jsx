import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Notifier, LoadingSpinner } from "/common/components";
import { useAuth } from "/features/Auth/hooks";

export function VerifyEmail() {
  const [verifyMessage, setVerifyMessage] = useState("");
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userID");
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { onSuccess } = Notifier();
  const { data: verifyResponse, error, loading, verifyEmail } = useAuth();

  useEffect(() => {
    if (userID && code && token) verifyEmail({ userID, code, token });
  }, [userID, token, code]);

  useEffect(() => {
    if (error) setVerifyMessage(error);
  }, [error]);

  useEffect(() => {
    if (!verifyResponse) return;
    setVerifyMessage(verifyResponse?.message);
    if (!verifyResponse?.isEmailVerified) return;
    const { message, isEmailVerified } = verifyResponse;
    let timeoutID;
    if (isEmailVerified) {
      setVerifyMessage("");
      onSuccess({ message, redirect: "login" });
      timeoutID = setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
    return () => clearTimeout(timeoutID);
  }, [verifyResponse]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Typography variant="h6">{verifyMessage}</Typography>
      <Typography variant="body2" color="textSecondary">
        {verifyMessage}
      </Typography>
    </>
  );
}
