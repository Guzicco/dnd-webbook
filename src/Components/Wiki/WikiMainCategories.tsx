import { Button, List, ListItem } from "@mui/material";
import React from "react";
import { assertState } from "../../Utils/AssertState";
import TrimString from "../../Utils/TrimString";
import { useWikiData, EWikiStates, useWikiDataHandler } from "./WikiContext";

interface Props {}

const MainCategories: React.FC<Props> = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();

  try {
    assertState(
      wikiData,
      EWikiStates.LOADED,
      EWikiStates.CATEGORY_PICKED,
      EWikiStates.ITEM_PICKED
    );
    return (
      <List>
        {wikiData.categoriesList.map((category) => {
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
        })}
      </List>
    );
  } catch {
    return <></>;
  }
};

export default MainCategories;
