import { styled } from "styled-components";
import { breakpoints } from "../../global/breakpoints";
import { colors } from "../../global/colors";
import Button from "../Button";
import { Link } from "react-router-dom";

export default function Form({
  title,
  onSubmit,
  error,
  description,
  onSubmitLabel,
  linkText,
  linkPath,
  linkUnderlined,
  $flexBasis,
  children,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <FORM $flexBasis={$flexBasis} onSubmit={handleSubmit}>
      {title && <h3>{title}</h3>}
      {description && <P style={{ marginBottom: "1em" }}>{description}</P>}
      {children}
      {error && <LABEL>{error}</LABEL>}
      <Button variant="primary" type="submit">
        {onSubmitLabel || "Submit"}
      </Button>
      {linkPath && linkText && linkUnderlined && (
        <P style={{ marginTop: "1em" }}>
          {linkText} <Link to={linkPath}>{linkUnderlined}</Link>
        </P>
      )}
    </FORM>
  );
}

const { mob, tab, lap, des } = breakpoints;

const FORM = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1em;
  text-align: center;
  flex-basis: ${(props) => props.$flexBasis || "45%"};
`;

const P = styled.p``;

const LABEL = styled.label`
  padding: 1em;
  margin-top: 1em;
  background: red;
  width: 13.5em;
  color: ${colors.white};
  border: none;
  text-align: center;
`;
