import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Wiki from "./Components/Wiki";
import { WikiProvider } from "./Components/WikiContext";

function App() {
	const pages = ["Home", "Wiki", "Characters", "Dice Simulator"];
	return (
		<Router>
			<div>
				<NavigationBar pages={pages} />
			</div>
			<main>
				<WikiProvider>
					<Routes>
						<Route path={"Wiki"} element={<Wiki />}>
							<Route
								path={"classes"}
								// element={<SubCategoryDisplay}
								element={<div>hello there</div>}
							>
								{/* Handle item Display */}
							</Route>
						</Route>
						<Route path={"Characters"}></Route>
						<Route path={"DiceSimulator"}></Route>
					</Routes>
				</WikiProvider>
			</main>
		</Router>
	);
}

export default App;
