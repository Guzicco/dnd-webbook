import { Button, List, ListItem } from "@mui/material";
import React from "react";
import TrimString from "../../Utils/TrimString";
import { useWikiData, EWikiStates, useWikiDataHandler } from "./WikiContext";

interface Props {}

const MainCategories: React.FC<Props> = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();

  return (
    <List>
      {wikiData.type === EWikiStates.LOADED ||
      wikiData.type === EWikiStates.CATEGORY_PICKED ||
      wikiData.type === EWikiStates.ITEM_PICKED
        ? wikiData.categoriesList.map((category) => {
            return (
              <ListItem key={category.name}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation={true}
                  onClick={(event: any) => {
                    wikiDataHanlder.onCategoryPick(category.url, category.name);
                  }}
                >
                  {TrimString(category.name)}
                </Button>
              </ListItem>
            );
          })
        : null}
    </List>
  );
};

export default MainCategories;
