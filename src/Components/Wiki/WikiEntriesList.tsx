import { Box, Button, List, ListItem, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TrimString from "../../Utils/TrimString";
import { EWikiStates, useWikiData, useWikiDataHandler } from "./WikiContext";
import { ILink } from "../../App";
import { EWikiEntryType } from "./WikiEntryDisplay";
import { assertState } from "../../Utils/AssertState";

const WikiEntriesList = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();
  const [activeCategory, setActiveCategory] = useState<{
    type: EWikiEntryType;
    url: string;
    itemsList: ILink[];
  }>({
    type: "ability-scores",
    url: "",
    itemsList: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedItems, setDisplayedItems] = useState<ILink[]>([]);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const itemsPerPage = 15;

  assertState(wikiData, EWikiStates.CATEGORY_PICKED, EWikiStates.ITEM_PICKED);
  useEffect(() => {
    setActiveCategory(wikiData.categoryPicked);
  }, [wikiData.categoryPicked]);

  useEffect(() => {
    const pagination = Math.ceil(
      activeCategory.itemsList.length / itemsPerPage - 1
    );
    setCurrentPage(1);
    setPaginationLength(pagination);
  }, [activeCategory]);

  useEffect(() => {
    const toDisplay =
      wikiData.categoryPicked.itemsList.length === 1
        ? wikiData.categoryPicked.itemsList
        : wikiData.categoryPicked.itemsList.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
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
            onChange={(event, page) => {
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
                onClick={() => wikiDataHanlder.onItemPick(category.url)}
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
