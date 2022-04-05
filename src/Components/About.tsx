import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { routes } from "../App";

const About: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: "100%", md: "90%" },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box pb={2} borderBottom={1}>
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
      <Box pb={2} borderBottom={1}>
        <Typography variant="h4">
          <Link to={routes.wiki.url} className={styles.textLink}>
            Wiki
          </Link>
        </Typography>
        <Typography variant="body1">
          Place where all knowledge lies - use it wisely.
        </Typography>
        <Typography variant="body1">
          Wiki contains information from D&D 5th Edition.
        </Typography>
        <Typography variant="caption">
          Data comes from external API{" "}
          <Link to="https://www.dnd5eapi.co/">www.dnd5eapi.co</Link>
        </Typography>
      </Box>
      <Box pb={2} borderBottom={1}>
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
      <Box pb={2} borderBottom={1}>
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
  );
};

export default About;
