import { Grid } from "@mui/material";
import React from "react";
import WikiEntriesList from "./WikiEntriesList";
import WikiMainCategories from "./WikiMainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  return (
    <Grid container>
      <Grid item>
        <WikiMainCategories />
      </Grid>
      <Grid item>
        <WikiEntriesList />
      </Grid>
    </Grid>
  );
};

export default Wiki;
