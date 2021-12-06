import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import MainCategories from "./MainCategories";

interface Props {}

const Wiki: React.FC<Props> = () => {
	return (
		<Grid container>
			<Grid item>
				<MainCategories />
			</Grid>
			<Grid item>
				<Outlet />
			</Grid>
		</Grid>
	);
};

export default Wiki;
