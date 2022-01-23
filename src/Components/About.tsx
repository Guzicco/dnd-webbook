import { ThemeProvider } from "@emotion/react";
import { Box, Container, createTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { routes } from "../App";

const theme = createTheme({
  typography: {
    fontFamily: ["BreatheFire", "Charm"].join(","),
    fontSize: 17,
    body1: {
      paddingLeft: 10,
      paddingTop: 1,
      maxWidth: "80%",
    },
    body2: {
      paddingLeft: 10,
      paddingTop: 1,
      maxWidth: "80%",
    },
    caption: {
      paddingLeft: 10,
      paddingTop: 1,
      maxWidth: "80%",
      fontStyle: "italic",
    },
  },
});

const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box my={2} mx={1} pb={2} borderBottom={1}>
          <Typography variant="h4">About</Typography>
          <Typography variant="body1">
            Page created for Dungeon's & Dragon's enthusiasts.
          </Typography>
          <Typography variant="body1">
            It's purpose is to provide easier access to informations needed for
            Dungeon Master and Players rather then scrolling through the classic
            rule books.
          </Typography>
          <Typography variant="caption">
            Page made for learning purposes. It's currently under development.
          </Typography>
        </Box>
        <Box my={2} mx={1} pl={1} pb={2} borderBottom={1}>
          <Typography variant="h4">
            <Link to={routes.wiki.url} className={styles.textLink}>
              Wiki
            </Link>
          </Typography>
          <Typography variant="body1">
            Place where all knowledge lies - use it wisely.
          </Typography>
          <Typography variant="body2">
            Wiki contains information from D&D 5th Edition.
          </Typography>
          <Typography variant="caption">
            Data comes from external API{" "}
            <Link to="https://www.dnd5eapi.co/">www.dnd5eapi.co</Link>
          </Typography>
        </Box>
        <Box my={2} mx={1} pl={1} pb={2} borderBottom={1}>
          <Typography variant="h4">
            <Link to={routes.characters.url} className={styles.textLink}>
              Characters
            </Link>
          </Typography>
          <Typography variant="body1">Characters spreadsheet.</Typography>
          <Typography variant="caption">
            Planned Feature - not yet implemented.
          </Typography>
        </Box>
        <Box my={2} mx={1} pl={1} pb={2} borderBottom={1}>
          <Typography variant="h4">
            <Link to={routes.diceSimulator.url} className={styles.textLink}>
              Dice Simulator
            </Link>
          </Typography>
          <Typography variant="body1">
            Dice thrower, just in case you forgot to bring dice.
          </Typography>
          <Typography variant="caption">
            Planned Feature - not yet implemented
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default About;
