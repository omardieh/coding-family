import { useState } from "react";
import { styled } from "styled-components";
import { breakpoints } from "../../global/breakpoints";
import { colors } from "../../global/colors";

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  enableShowPass,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const determineInputType = () => {
    if (type === "email") return "email";
    if (type === "password" && !showPassword) return "password";
    return "text";
  };

  return (
    <CONTAINER>
      {label && <LABEL>{label}</LABEL>}
      <INPUT
        name={name}
        type={determineInputType()}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "password" && enableShowPass && (
        <PASSWORD_CONTAINER $marginTop=".5em">
          <LABEL $textAlign="end" $marginBottom="0">
            show password
          </LABEL>
          <INPUT
            $width="auto"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </PASSWORD_CONTAINER>
      )}
    </CONTAINER>
  );
}

const CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
`;

const INPUT = styled.input`
  width: ${(props) => props.$width || "100%"};
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PASSWORD_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props.$marginTop || "auto"};
`;

const LABEL = styled.label`
  width: 100%;
  text-align: ${(props) => props.$textAlign || "start"};
  margin-bottom: ${(props) => props.$marginBottom || "0.5em"};
`;
