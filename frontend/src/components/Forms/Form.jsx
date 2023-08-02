import { styled } from "styled-components";
import { breakpoints } from "../../global/breakpoints";
import { colors } from "../../global/colors";

export default function Form({
  title,
  onSubmit,
  error,
  children,
  description,
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
    </FORM>
  );
}

const { mob, tab, lap, des } = breakpoints;

const FORM = styled.form`
  background-color: ${colors.whiteDark};
  width: 25em;
  padding: 3em 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1em;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const P = styled.p`
  margin-bottom: 1em;
  text-align: center;
`;

const LABEL = styled.label`
  padding: 1em;
  margin-top: 1em;
  background: red;
  width: 13.5em;
  color: ${colors.white};
  border: none;
  text-align: center;
`;
