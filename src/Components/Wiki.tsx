import { Grid } from "@mui/material";
import React from "react";
import WikiEntriesList from "./WikiEntriesList";
import WikiEntryDisplay from "./WikiEntryDisplay";
import WikiMainCategories from "./WikiMainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={2}>
        <WikiMainCategories />
      </Grid>
      <Grid item xs={2}>
        <WikiEntriesList />
      </Grid>
      <Grid item xs={8}>
        <WikiEntryDisplay />
      </Grid>
    </Grid>
  );
};

export default Wiki;
