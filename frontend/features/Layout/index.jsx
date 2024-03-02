import styled from "styled-components";
import Footer from "/features/Footer";
import { colors } from "/common/assets/colors";
import { breakpoints } from "/common/assets/breakpoints";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import Header from "../Header";
import useScrollTop from "/common/hooks/useScrollTop";

export default function Layout({ title, children }) {
  useScrollTop("main__app");
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
        <MAIN id="main__app">{children}</MAIN>
        <Footer title={title} />
      </ThemeProvider>
    </>
  );
}

const { mob, tab, lap, des } = breakpoints;

const MAIN = styled.main`
  background: ${colors.white.bg.mid};
  min-height: 88%;
  max-width: 100%;
  background: yellow;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 6em 2em;
  padding-bottom: 10em;
  row-gap: 2em;
  position: relative;
  @media ${mob}, ${tab} {
    font-size: 16px;
  }
`;
