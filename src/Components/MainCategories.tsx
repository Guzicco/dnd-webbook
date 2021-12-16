import { List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";
import { useWikiData, EWikiStates } from "./WikiContext";

interface Props {}

const MainCategories: React.FC<Props> = () => {
  const wikiData = useWikiData();
  let categories: ILink[] = [];

  if (wikiData.type === "LOADED") {
    categories = wikiData.state.categoriesList;
  }

  return (
    <List sx={{ mr: 2, width: 200 }}>
      {categories.map((category: ILink) => {
        return (
          <ListItem key={category.label}>
            <NavLink
              to={{ pathname: `${category.label}` }}
              // onClick={() => handleActiveCategoryChange(category)}
              className={() => "active-link"}
            >
              {trimString(category.label)}
            </NavLink>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MainCategories;
