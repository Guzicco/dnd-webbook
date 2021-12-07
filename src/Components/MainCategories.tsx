import { List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useActiveCategory, useWikiMainCategories } from "./WikiContext";

function trimString(tmp = "") {
	return tmp.replace("-", " ").toUpperCase();
}

const MainCategories: React.FC = () => {
	const categories = useWikiMainCategories();
	const categoryPick = useActiveCategory();

	return (
		<List sx={{ mr: 2, width: 200 }}>
			{categories.map((category: string) => {
				return (
					<ListItem key={category}>
						<NavLink
							to={{ pathname: `${category}` }}
							onClick={() => categoryPick.onChange(category)}
							className={() => "active-link"}
						>
							{trimString(category)}
						</NavLink>
					</ListItem>
				);
			})}
		</List>
	);
};

export default MainCategories;
