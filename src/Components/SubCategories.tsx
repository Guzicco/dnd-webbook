import { Button, List, ListItem } from "@mui/material";
import React from "react";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { EWikiStates, useWikiData } from "./WikiContext";

const SubCategories = () => {
  const wikiData = useWikiData();
  let categories: ILink[] = [];

  if (wikiData.type === EWikiStates.CATEGORY_PICKED) {
    categories = wikiData.state.categoryPicked.subcategories;
  }

  return (
    <List sx={{ mr: 2, width: 200 }}>
      {categories.map((category: ILink) => {
        return (
          <ListItem key={category.url}>
            <Button variant="contained" fullWidth>
              {trimString(category.label)}
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SubCategories;
