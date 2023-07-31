import { styled } from "styled-components";
import { breakpoints } from "../../global/breakpoints";
import { colors } from "../../global/colors";

export default function Form({
  title,
  onSubmit,
  onSubmitLabel,
  error,
  children,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <FORM onSubmit={handleSubmit}>
      {title && <H2>{title}</H2>}
      {children}
      {error && <LABEL>{error}</LABEL>}
      <BUTTON type="submit">{onSubmitLabel || "Submit"}</BUTTON>
    </FORM>
  );
}

const { mob, tab, lap, des } = breakpoints;

const FORM = styled.form`
  background-color: ${colors.whiteDark};
  width: 25em;
  padding: 3em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1em;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const H2 = styled.h2`
  margin-bottom: 0.5em;
`;

const BUTTON = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: ${colors.blackDark};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 1em 0;
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
