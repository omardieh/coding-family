import { styled } from "styled-components";
import { colors } from "./colors";
import { breakpoints } from "./breakpoints";

const { mob, tab, lap, des } = breakpoints;

export const CARD = styled.section`
  background: ${colors.white.bg.dark};
  padding: 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: auto;
  row-gap: 3em;

  @media ${mob}, ${tab} {
    justify-content: center;
  }
  @media ${lap}, ${des} {
    justify-content: ${(props) => props.$justifyContent || "space-between;"};
  }
`;

export const SEPARATOR = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.2);
  @media ${mob}, ${tab} {
    width: 100%;
  }
  @media ${lap}, ${des} {
    height: 100%;
  }
`;
