import { Box, Button, List, ListItem, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { EWikiStates, useWikiData } from "./WikiContext";

const SubCategories = () => {
  const wikiData = useWikiData();
  let categories: ILink[] = [];
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayedItems, setDisplayedItems] = useState<ILink[]>([]);

  if (wikiData.type === EWikiStates.CATEGORY_PICKED) {
    categories = wikiData.state.categoryPicked.subcategories;
  }

  const paginationLength = Math.ceil(categories.length / 10 - 1);

  useEffect(() => {
    let toDisplay =
      categories.length === 1
        ? categories
        : categories.slice((currentPage - 1) * 10, 10 * currentPage - 1);
    setDisplayedItems(toDisplay);
  }, [currentPage, wikiData, categories]);

  return (
    <div>
      {paginationLength > 0 ? (
        <Pagination
          sx={{ mt: 2 }}
          count={paginationLength + 1}
          size="small"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            console.log(page);
            setCurrentPage(page);
          }}
        />
      ) : (
        <Box sx={{ height: 26, mt: 2 }}></Box>
      )}
      <List sx={{ mr: 2, width: 200 }}>
        {displayedItems.map((category: ILink) => {
          return (
            <ListItem sx={{ maxHeight: 100 }} key={category.index}>
              <Button variant="contained" fullWidth>
                {trimString(category.label)}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SubCategories;
