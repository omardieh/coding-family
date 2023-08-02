import { styled } from "styled-components";
import { breakpoints } from "../../global/breakpoints";
import { colors } from "../../global/colors";
import Button from "../Button";
import { Link } from "react-router-dom";

export default function Form({
  title,
  onSubmit,
  error,
  children,
  description,
  onSubmitLabel,
  link,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <FORM onSubmit={handleSubmit}>
      {title && <h3>{title}</h3>}
      {description && <P>{description}</P>}
      {children}
      {error && <LABEL>{error}</LABEL>}
      <Button variant="primary" type="submit">
        {onSubmitLabel || "Submit"}
      </Button>
      {link && (
        <P>
          Don&apos;t have an account yet? <Link to={link}> Sign Up Here</Link>
        </P>
      )}
    </FORM>
  );
}

const { mob, tab, lap, des } = breakpoints;

const FORM = styled.form`
  background-color: ${colors.whiteDark};
  padding: 3em 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1em;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
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
