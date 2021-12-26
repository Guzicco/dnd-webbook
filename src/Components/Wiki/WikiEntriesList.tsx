import { Box, Button, List, ListItem, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TrimString from "../../Utils/TrimString";
import { EWikiStates, useWikiData, useWikiDataHandler } from "./WikiContext";
import { ILink } from "../../App";

const WikiEntriesList = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();
  const [activeCategory, setActiveCategory] = useState<{
    type: number;
    url: string;
    itemsList: ILink[];
  }>({
    type: 0,
    url: "",
    itemsList: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedItems, setDisplayedItems] = useState<ILink[]>([]);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const itemsPerPage = 15;

  useEffect(() => {
    if (
      wikiData.type === EWikiStates.CATEGORY_PICKED ||
      wikiData.type === EWikiStates.ITEM_PICKED
    ) {
      setActiveCategory(wikiData.state.categoryPicked);
    }
  });

  useEffect(() => {
    const pagination = Math.ceil(
      activeCategory.itemsList.length / itemsPerPage - 1
    );
    setCurrentPage(1);
    setPaginationLength(pagination);
  }, [activeCategory]);

  useEffect(() => {
    const toDisplay =
      wikiData.type === EWikiStates.CATEGORY_PICKED ||
      wikiData.type === EWikiStates.ITEM_PICKED
        ? wikiData.state.categoryPicked.itemsList.length === 1
          ? wikiData.state.categoryPicked.itemsList
          : wikiData.state.categoryPicked.itemsList.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
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
            page={currentPage}
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
      <List>
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
                {TrimString(category.name)}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default WikiEntriesList;
