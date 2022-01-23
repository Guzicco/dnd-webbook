import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import About from "./Components/About";
import NavigationBar from "./Components/NavigationBar";
import Wiki from "./Components/Wiki/Wiki";
import { WikiDataProvider } from "./Components/Wiki/WikiContext";
import { EWikiEntryType } from "./Components/Wiki/WikiEntryDisplay";

export type IRouteName = "about" | "wiki" | "characters" | "diceSimulator";
export interface ILink {
  url: string;
  name: string;
  index?: string;
}
export interface ICategoryLinkLink {
  url: string;
  name: EWikiEntryType;
  index?: string;
}

export interface IGenericLink<NameType = String> {
  url: string;
  name: NameType;
  index?: string;
}

export const routes: { [key in IRouteName]: ILink } = {
  about: {
    name: "About",
    url: "",
  },
  wiki: {
    name: "Wiki",
    url: "wiki",
  },
  characters: {
    name: "Characters",
    url: "characters",
  },
  diceSimulator: {
    name: "Dice Simulator",
    url: "diceSimulator",
  },
};

const theme = createTheme({
  typography: {
    fontFamily: ["Charm"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: '@font-face {font-family: "Charm"};',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <nav>
            <NavigationBar routes={routes} />
          </nav>
          <main>
            <Routes>
              <Route path={routes.about.url} element={<About />} />
              <Route
                path={routes.wiki.url}
                element={
                  <WikiDataProvider>
                    <Wiki />
                  </WikiDataProvider>
                }
              />
              <Route path={routes.characters.url} />
              <Route path={routes.diceSimulator.url} />
            </Routes>
          </main>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
