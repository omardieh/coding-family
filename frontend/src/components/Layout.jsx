import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { colors } from "../global/colors";
import { breakpoints } from "../global/breakpoints";
export default function Layout({ children }) {
  return (
    <>
      <HEADER>
        <H1>Site Logo Here</H1>
        <Navbar />
      </HEADER>
      <MAIN>{children}</MAIN>
      <FOOTER>
        <Footer />
      </FOOTER>
    </>
  );
}

const { mob, tab } = breakpoints;

const HEADER = styled.header`
  @media ${mob}, ${tab} {
    flex-direction: column;
  }
  flex-basis: 7%;
  max-height: 7%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.blackDark};
  color: ${colors.white};
`;

const MAIN = styled.main`
  background-color: ${colors.white};
  flex-basis: 86%;
  max-height: 86%;
  max-width: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const FOOTER = styled.footer`
  flex-basis: 7%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blackDark};
  color: ${colors.white};
`;

const H1 = styled.h1`
  padding-left: 0.5em;
  @media ${mob}, ${tab} {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;
