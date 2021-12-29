import { Button, List, ListItem } from "@mui/material";
import React from "react";
import TrimString from "../../Utils/TrimString";
import { ILink } from "../../App";
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
        ? wikiData.categoriesList.map((category: ILink) => {
            return (
              <ListItem key={category.name}>
                <Button
                  data-url={category.url}
                  data-label={category.name}
                  fullWidth
                  variant="contained"
                  disableElevation={true}
                  onClick={(event: any) => {
                    wikiDataHanlder.onCategoryPick(
                      event.target.dataset.url,
                      event.target.dataset.label
                    );
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
