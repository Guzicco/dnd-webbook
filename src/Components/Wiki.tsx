import { Grid } from "@mui/material";
import React from "react";
import MainCategories from "./MainCategories";
import SubCategories from "./SubCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  return (
    <Grid container>
      <Grid item>
        <MainCategories />
      </Grid>
      <Grid item>
        <SubCategories />
      </Grid>
    </Grid>
  );
};

export default Wiki;
