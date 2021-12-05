import React from "react";
import { NavLink } from "react-router-dom";

function trimString(tmp = "") {
	return tmp.replace("-", " ").toUpperCase();
}

const MainCategories = ({
	categories,
	onCategoryPick,
}: {
	categories: string[];
	onCategoryPick: (category: string) => void;
}) => {
	const handleClick = (category: string) => {
		onCategoryPick(category);
	};

	return (
		<aside>
			<ul className="nav list-group">
				{categories.map((category: string) => {
					return (
						<NavLink
							key={category}
							to={{ pathname: `${category}` }}
							onClick={() => handleClick(category)}
							className={() => "active-link"}
						>
							<li className="list-group-item">{trimString(category)}</li>
						</NavLink>
					);
				})}
			</ul>
		</aside>
	);
};

export default MainCategories;
