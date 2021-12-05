import { List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_URL } from "../Globals";
import fetchData from "../Utils/FetchData";

interface Props {
	onCategoryPicked: (category: string) => void;
}

function trimString(tmp = "") {
	return tmp.replace("-", " ").toUpperCase();
}

const MainCategories: React.FC<Props> = ({ onCategoryPicked }) => {
	const [categories, setCategories] = useState<string[]>([""]);

	const fetchCategories = async () => {
		try {
			const getCategories = await fetchData(API_URL);
			const keys = Object.keys(getCategories);
			setCategories([...keys]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleClick: (category: string) => void = (category) => {
		onCategoryPicked(category);
	};

	return (
		<List sx={{ mr: 2, width: 200 }}>
			{categories.map((category: string) => {
				return (
					<ListItem>
						<NavLink
							key={category}
							to={{ pathname: `${category}` }}
							onClick={() => handleClick(category)}
							className={() => "active-link"}
						>
							<li className="list-group-item">{trimString(category)}</li>
						</NavLink>
					</ListItem>
				);
			})}
		</List>
	);
};

export default MainCategories;
