import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { themeColors } from "./theme-colors";
import { darkTheme } from "./theme-dark";
import { lightTheme } from "./theme-light";
import { breakpoints } from "/common/assets/breakpoints";
import { colors } from "/common/assets/colors";
import useScrollTop from "/common/hooks/useScrollTop";
import Header from "/features/global-layout/main-navigation/Header";
import Footer from "/features/global-layout/main-navigation/Footer";

export default function Layout({ title, children }) {
  const [mode, setMode] = useState("light");
  useScrollTop("main__app");
  const theme = useMemo(
    () =>
      createTheme({
        colors: themeColors,
        palette: {
          mode: mode,
          ...(mode === "light" ? lightTheme : darkTheme),
        },
      }),
    [mode]
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header mode={mode} setMode={setMode} />
        <MAIN id="main__app">{children}</MAIN>
        <Footer title={title} />
      </ThemeProvider>
    </>
  );
}

const { mob, tab } = breakpoints;

const MAIN = styled.main`
  background: ${colors.white.bg.mid};
  min-height: 88%;
  max-width: 100%;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* padding-bottom: 10em; */
  row-gap: 2em;
  position: relative;
  @media ${mob}, ${tab} {
    font-size: 16px;
  }
`;
