import React, { useState } from "react";
import MainCategories from "./Components/MainCategories";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";

function App() {
	const [wikiCategoryPicked, setWikiCategoryPicked] = useState<string>("");

	const pages = ["Home", "Wiki", "Characters", "Dice Simulator"];

	const handleWikiCategoryPick: (category: string) => void = (category) => {
		setWikiCategoryPicked(category);
	};

	return (
		<Router>
			<div>
				<NavigationBar pages={pages} />
			</div>
			<main>
				<Routes>
					<Route
						path={`Wiki`}
						element={
							<MainCategories onCategoryPicked={handleWikiCategoryPick} />
						}
					>
						<Route
							path={`${wikiCategoryPicked}`}
							element={<div>hello there</div>}
						/>
					</Route>
					<Route path={"Characters"}></Route>
					<Route path={"DiceSimulator"}></Route>
				</Routes>
			</main>
		</Router>
	);
}

export default App;
