import { List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import trimString from "../Utils/trimString";
import { ILink } from "./NavigationBar";

interface Props {
  categories: ILink[];
}

const MainCategories: React.FC<Props> = ({ categories }) => {
  console.log(categories);
  console.log("hihi");
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
