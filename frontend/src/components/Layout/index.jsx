import styled from "styled-components";
import Footer from "./../Footer";
import Navbar from "./../Navbar/index";
import { colors } from "./../../global/colors";
import { breakpoints } from "./../../global/breakpoints";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";

export default function Layout({ title, logo, description, children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
  });

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HEADER>
          <DIV>
            <H1> {logo || "Site Logo Here"} </H1>
            <P> {description || "Site Description Here"} </P>
          </DIV>
          <Navbar />
        </HEADER>
        <MAIN>{children}</MAIN>
        <FOOTER>
          <Footer title={title} />
        </FOOTER>
      </ThemeProvider>
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
  position: relative;
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
