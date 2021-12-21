import { Grid } from "@mui/material";
import React from "react";
import WikiEntriesList from "./WikiEntriesList";
import WikiEntryDisplay from "./WikiEntryDisplay";
import WikiMainCategories from "./WikiMainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  return (
    <Grid container spacing={2} sx={{ px: 4 }}>
      <Grid item xs={12} sm={6} md={3} xl={2}>
        <WikiMainCategories />
      </Grid>
      <Grid item xs={12} sm={6} md={3} xl={2}>
        <WikiEntriesList />
      </Grid>
      <Grid item xs={12} sm={12} md={6} xl={8}>
        <WikiEntryDisplay />
      </Grid>
    </Grid>
  );
};

export default Wiki;
