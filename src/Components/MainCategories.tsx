import { Button, List, ListItem } from "@mui/material";
import React from "react";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { useWikiData, EWikiStates, useWikiDataHandler } from "./WikiContext";

interface Props {}

const MainCategories: React.FC<Props> = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();
  let categories: ILink[] = [];

  if (wikiData.type === EWikiStates.LOADED) {
    categories = wikiData.state.categoriesList;
  }
  if (wikiData.type === EWikiStates.CATEGORY_PICKED) {
    categories = wikiData.state.categoriesList;
  }

  return (
    <List sx={{ mr: 2, width: 200 }}>
      {categories.map((category: ILink) => {
        return (
          <ListItem key={category.url}>
            <Button
              data-url={category.url}
              fullWidth
              variant="contained"
              disableElevation={true}
              onClick={(event: any) => {
                wikiDataHanlder.onCategoryPick(event.target.dataset.url);
              }}
            >
              {trimString(category.label)}
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MainCategories;
