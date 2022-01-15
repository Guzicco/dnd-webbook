import { Grid } from "@mui/material";
import React from "react";
import { assertState } from "../../Utils/AssertState";
import { EWikiStates, useWikiData } from "./WikiContext";
import WikiEntriesList from "./WikiEntriesList";
import WikiEntryDisplay from "./WikiEntryDisplay";
import WikiMainCategories from "./WikiMainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
  const wikiData = useWikiData();

  const displayWikiEntriesList = () => {
    try {
      assertState(
        wikiData,
        EWikiStates.CATEGORY_PICKED,
        EWikiStates.ITEM_PICKED
      );
      return <WikiEntriesList />;
    } catch {
      return <></>;
    }
  };
  const displayWikiEntryDisplay = () => {
    try {
      assertState(wikiData, EWikiStates.ITEM_PICKED);
      return <WikiEntryDisplay />;
    } catch {
      return <></>;
    }
  };

  return (
    <Grid container spacing={2} sx={{ px: 4 }}>
      <Grid item xs={12} sm={6} md={2}>
        <WikiMainCategories />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        {displayWikiEntriesList()}
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        {displayWikiEntryDisplay()}
      </Grid>
    </Grid>
  );
};

export default Wiki;
