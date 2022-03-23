import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import About from "./Components/About";
import CharacterCreator from "./Components/CharacterSheet/CharacterCreator";
import DiceSimulator from "./Components/DiceSimulator/DiceSimulator";
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
          <NavigationBar
            routes={routes}
            sx={{ height: { xs: "10vh", md: "7vh" } }}
          />
          <Container component="main" sx={{ pt: { xs: "10vh", md: "7vh" } }}>
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
              <Route
                path={routes.characters.url}
                element={<CharacterCreator />}
              />
              <Route
                path={routes.diceSimulator.url}
                element={<DiceSimulator />}
              />
            </Routes>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
