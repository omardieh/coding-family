import styled from "styled-components";
import Footer from "/features/Footer";
import { colors } from "/common/assets/colors";
import { breakpoints } from "/common/assets/breakpoints";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import Header from "../Header";

export default function Layout({ title, children }) {
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
  }, [title]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <MAIN>{children}</MAIN>
        <Footer title={title} />
      </ThemeProvider>
    </>
  );
}

const { mob, tab, lap, des } = breakpoints;

const MAIN = styled.main`
  background: ${colors.white.bg.mid};
  flex-basis: 86%;
  max-width: 100%;
  background: yellow;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4em;
  top: 2em;
  padding-bottom: 5em;
  row-gap: 2em;
  position: relative;
  @media ${mob}, ${tab} {
    font-size: 16px;
  }
`;
