import { Grid } from "@mui/material";
import React from "react";
import { useWikiData } from "./WikiContext";
import MainCategories from "./MainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  const wikiData = useWikiData();

  return (
    <Grid container>
      <Grid item>
        <MainCategories />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default Wiki;
