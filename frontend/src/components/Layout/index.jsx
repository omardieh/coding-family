import styled from "styled-components";
import Footer from "./../Footer";
import Navbar from "./../Navbar/index";
import { colors } from "./../../global/colors";
import { breakpoints } from "./../../global/breakpoints";

export default function Layout({ children, siteLogo, siteSlogan }) {
  return (
    <>
      <HEADER>
        <DIV>
          <H1> {siteLogo || "Site Logo Here"} </H1>
          <P> {siteSlogan || "Site Slogan Here"} </P>
        </DIV>
        <Navbar />
      </HEADER>
      <MAIN>{children}</MAIN>
      <FOOTER>
        <Footer />
      </FOOTER>
    </>
  );
}

const { mob, tab, lap, des } = breakpoints;

const HEADER = styled.header`
  @media ${mob}, ${tab} {
    flex-direction: column;
  }
  flex-basis: 7%;
  max-height: 7%;
  width: 100%;
  display: flex;
  background: ${colors.primary.bg.mid};
  color: ${colors.white.mid};
`;

const DIV = styled.div`
  @media ${mob}, ${tab} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 11px;
  }
  @media ${lap}, ${des} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    column-gap: 1em;
    min-width: fit-content;
    flex-basis: 100%;
  }
  padding: 0.8em 0;
  padding-left: 1em;
  margin: auto 0;
`;

const P = styled.p``;

const H1 = styled.h1`
  font-family: Montserrat;
  font-size: 20px;
  @media ${mob}, ${tab} {
    font-size: 16px;
  }
`;

const MAIN = styled.main`
  background: ${colors.white.bg.mid};
  flex-basis: 86%;
  max-height: 86%;
  max-width: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2em;
  row-gap: 2em;
`;

const FOOTER = styled.footer`
  flex-basis: 7%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.black.bg.mid};
  color: ${colors.white.mid};
`;
