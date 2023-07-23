import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function EmailVerify() {
  const [verifyMessage, setVerifyMessage] = useState("");
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userID");
  const navigate = useNavigate();
  const { clearEmailVerifyToken } = useContext(AuthContext);

  useEffect(() => {
    AuthService.verifyEmail({ userID: userID })
      .then((response) => {
        setVerifyMessage(response.data);
        clearEmailVerifyToken();
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  }, [userID, navigate, clearEmailVerifyToken]);

  return <div>EmailVerify : {verifyMessage} </div>;
}
