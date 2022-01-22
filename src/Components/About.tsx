import { ThemeProvider } from "@emotion/react";
import { Box, Container, createTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const theme = createTheme({
  typography: {
    fontFamily: ["BreatheFire", "Charm"].join(","),
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
            <Link to="/Wiki" className={styles.textLink}>
              Wiki
            </Link>
          </Typography>
          <Typography variant="body1">
            Place where all knowledge lies - use it wisely.
          </Typography>
          <Typography variant="body2"></Typography>
        </Box>
        <Box my={2} mx={1} pl={1} pb={2} borderBottom={1}>
          <Typography variant="h4">Characters</Typography>
        </Box>
        <Box my={2} mx={1} pl={1} pb={2} borderBottom={1}>
          <Typography variant="h4">Dice Simulator</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default About;
