import { useAuthContext } from "../../contexts/AuthContext";
import { styled } from "styled-components";

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <DIV>
      <P> {user.username} </P>
      <IMG src={user.avatar} alt={user.fullName} />
      <H3> {user.fullName} </H3>
    </DIV>
  );
}

const DIV = styled.div`
  border-radius: 14px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #ccc;
`;
const P = styled.p`
  width: 100%;
  padding: 0.5em;
`;
const IMG = styled.img`
  max-width: 14em;
  width: 100%;
  border-radius: 100%;
`;
const H3 = styled.h3`
  padding: 0.5em;
`;
