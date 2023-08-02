import styled, { css } from "styled-components";

export default function Button({
  icon,
  onClick,
  isDisabled,
  isLoading,
  variant,
  size,
  type,
  children,
}) {
  const handleClick = () => {
    if (onClick && !isDisabled && !isLoading) {
      onClick();
    }
  };

  return (
    <BUTTON
      onClick={handleClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
      variant={variant || "primary"}
      size={size || "medium"}
    >
      {children}
      {isLoading ? "Loading..." : icon && <ICON>{icon}</ICON>}
    </BUTTON>
  );
}

const BUTTON = styled.button`
  padding: 1em;
  margin: 0 0.5em;
  border: 1px solid #ccc;
  border-radius: 7px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: transparent;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 13.5em;

  ${({ isLoading, isDisabled }) =>
    (isLoading || isDisabled) &&
    `
      opacity: 0.6;
      cursor: not-allowed;
    `}

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #3498db, #1c7fd4);
        `;
      case "light":
        return `
        color: #000000;
        background: linear-gradient(180deg, #f8f9fa, #e9ecef);
        `;
      case "secondary":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #95a5a6, #7f8c8d);
        `;
      case "success":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #27ae60, #219d54);
        `;
      case "danger":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #e74c3c, #d62c1a);
        `;
      case "dark":
        return `
          color: #ffffff;
        background: linear-gradient(180deg, #343a40, #23272b);
        `;
      case "info":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #17a2b8, #138496);
        `;
      case "primary-dark":
        return `
          color: #ffffff;
          background: linear-gradient(180deg, #1a5276, #154360);
        `;
      case "neutral":
        return `
    color: #000000;
    background: linear-gradient(180deg, #bdc3c7, #95a5a6);
  `;
      case "custom":
        return `
    color: #ffffff;
    background: linear-gradient(180deg, #ffa500, #ff8c00);
  `;
      case "secondary-dark":
        return `
    color: #ffffff;
    background: linear-gradient(180deg, #515a5a, #34495e);
  `;

      case "success-dark":
        return `
    color: #ffffff;
    background: linear-gradient(180deg, #1e8449, #196f3d);
  `;

      case "danger-dark":
        return `
    color: #ffffff;
    background: linear-gradient(180deg, #c0392b, #a93226);
  `;
      default:
        return "";
    }
  }}

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          padding: 8px 16px;
        `;
      case "large":
        return `
          padding: 16px 32px;
        `;
      default:
        return "";
    }
  }}

&:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ICON = styled.span`
  font-size: 2em;
  height: 1em;
`;
const TITLE = styled.span``;
