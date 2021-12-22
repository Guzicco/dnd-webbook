import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar, { ILink } from "./Components/NavigationBar";
import Wiki from "./Components/Wiki";
import { WikiDataProvider } from "./Components/WikiContext";

export type IRouteName = "about" | "wiki" | "characters" | "diceSimulator";

const routes: { [key in IRouteName]: ILink } = {
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

function App() {
  return (
    <Router>
      <nav>
        <NavigationBar routes={routes} />
      </nav>
      <main>
        <Routes>
          <Route path={routes.about.url} />
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
    </Router>
  );
}

export default App;
