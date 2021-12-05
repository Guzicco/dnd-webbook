import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "./Globals";
import MainCategories from "./Components/MainCategories";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";

const fetchData = async (link: string) => {
	try {
		const response = await Axios.get(link);
		return await response.data;
	} catch (err) {
		console.log(err);
	}
};

function App() {
	const [categories, setCategories] = useState<string[]>([""]);
	const [activeMainCategory, setActiveMainCategory] = useState<string>("");

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

	const handleSetMainCategory = (category: string) => {
		setActiveMainCategory(category);
	};

	return (
		<Router>
			<NavigationBar />
			<div className="App">
				<Routes>
					<Route
						path={`Wiki`}
						element={
							<MainCategories
								categories={categories}
								onCategoryPick={handleSetMainCategory}
							/>
						}
					></Route>

					<Route path={"Characters"}></Route>
					<Route path={"DiceSimulator"}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
export { fetchData };
