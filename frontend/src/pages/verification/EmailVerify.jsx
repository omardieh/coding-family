import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function EmailVerify() {
  const [verifyMessage, setVerifyMessage] = useState("");
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userID");
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.verifyEmail({ userID: userID })
      .then((response) => {
        setVerifyMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  }, [userID, navigate]);

  return <div>EmailVerify : {verifyMessage} </div>;
}
