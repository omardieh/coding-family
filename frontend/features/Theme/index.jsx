import CssBaseline from "@mui/material/CssBaseline";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import { breakpoints } from "/common/assets/breakpoints";
import { colors } from "/common/assets/colors";
import useScrollTop from "/common/hooks/useScrollTop";
import Footer from "/features/Footer";

export default function Layout({ title, children }) {
  useScrollTop("main__app");
  const theme = createTheme({
    colors: {
      // *** White *** //
      white: {
        mid: "#f8f9fa",
        light: "#ffffff",
        dark: "#d3d3d3",
        bg: {
          mid: "linear-gradient(180deg, #ffffff, #f8f9fa)",
          dark: "linear-gradient(180deg, #fbf9ff, #e5e2eb)",
        },
      },
      // *** Black *** //
      black: {
        mid: "#343a40",
        light: "#212529",
        dark: "#121416",
        bg: {
          mid: "linear-gradient(180deg, #212529, #343a40)",
          dark: "linear-gradient(180deg, #121416, #0a0c0e)",
        },
      },
      // *** Purple *** //
      purple: {
        mid: "#6A67CE",
        light: "#A997DF",
        dark: "#463F87",
        bg: {
          mid: "linear-gradient(180deg, #A997DF, #6A67CE)",
          dark: "linear-gradient(180deg, #463F87, #1F195C)",
        },
      },
      // *** Yellow *** //
      orange: {
        mid: "#FFD600",
        light: "#FFFF8D",
        dark: "#FFAB00",
        bg: {
          mid: "linear-gradient(180deg, #FFFF8D, #FFD600)",
          dark: "linear-gradient(180deg, #FFAB00, #FF6F00)",
        },
      },
      // *** Blue *** //
      blue: {
        mid: "#1c7fd4",
        light: "#3498db",
        dark: "#0e4b75",
        bg: {
          mid: "linear-gradient(180deg, #3498db, #1c7fd4)",
          dark: "linear-gradient(180deg, #0e4b75, #082f4b)",
        },
      },
      // *** Green *** //
      green: {
        mid: "#28a745",
        light: "#72d076",
        dark: "#1b8831",
        bg: {
          mid: "linear-gradient(180deg, #72d076, #28a745)",
          dark: "linear-gradient(180deg, #1b8831, #14661f)",
        },
      },
      // *** Red *** //
      red: {
        mid: "#dc3545",
        light: "#f36c63",
        dark: "#a61b24",
        bg: {
          mid: "linear-gradient(180deg, #f36c63, #dc3545)",
          dark: "linear-gradient(180deg, #a61b24, #80141b)",
        },
      },
    },
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
