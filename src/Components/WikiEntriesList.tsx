import { Box, Button, List, ListItem, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { EWikiStates, useWikiData, useWikiDataHandler } from "./WikiContext";

const SubCategories = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayedItems, setDisplayedItems] = useState<ILink[]>([]);

  const itemsPerPage = 15;
  const paginationLength =
    wikiData.type === EWikiStates.CATEGORY_PICKED ||
    wikiData.type === EWikiStates.ITEM_PICKED
      ? Math.ceil(
          wikiData.state.categoryPicked.itemsList.length / itemsPerPage - 1
        )
      : 0;

  useEffect(() => {
    const toDisplay =
      wikiData.type === EWikiStates.CATEGORY_PICKED ||
      wikiData.type === EWikiStates.ITEM_PICKED
        ? wikiData.state.categoryPicked.itemsList.length === 1
          ? wikiData.state.categoryPicked.itemsList
          : wikiData.state.categoryPicked.itemsList.slice(
              (currentPage - 1) * itemsPerPage,
              itemsPerPage * currentPage - 1
            )
        : [];
    setDisplayedItems(toDisplay);
  }, [wikiData, currentPage]);

  return (
    <div>
      {paginationLength > 0 ? (
        <Box sx={{ display: "flex" }}>
          <Pagination
            sx={{ mt: 2, mx: "auto" }}
            count={paginationLength + 1}
            size="small"
            hideNextButton={true}
            hidePrevButton={true}
            onChange={(event: React.ChangeEvent<any>, page: number) => {
              setCurrentPage(page);
            }}
          />
        </Box>
      ) : (
        <Box sx={{ height: 26, mt: 2 }}></Box>
      )}
      <List sx={{ mr: 2 }}>
        {displayedItems.map((category: ILink) => {
          return (
            <ListItem key={category.index}>
              <Button
                variant="contained"
                fullWidth
                data-url={category.url}
                onClick={(event: any) =>
                  wikiDataHanlder.onItemPick(event.target.dataset.url)
                }
              >
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
