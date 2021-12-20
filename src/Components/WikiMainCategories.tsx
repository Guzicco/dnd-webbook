import { Button, List, ListItem } from "@mui/material";
import React from "react";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { useWikiData, EWikiStates, useWikiDataHandler } from "./WikiContext";

interface Props {}

const MainCategories: React.FC<Props> = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();

  return (
    <List sx={{ mr: 2, width: 200 }}>
      {wikiData.type === EWikiStates.LOADED ||
      wikiData.type === EWikiStates.CATEGORY_PICKED ||
      wikiData.type === EWikiStates.ITEM_PICKED ? (
        wikiData.state.categoriesList.map((category: ILink) => {
          return (
            <ListItem key={category.label}>
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
        })
      ) : (
        <></>
      )}
    </List>
  );
};

export default MainCategories;
