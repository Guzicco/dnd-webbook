import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../Globals";
import fetchData from "../Utils/FetchData";

const WikiPathContext = createContext<IContext<string>>({
	getter: "",
	setter: () => {},
});
const WikiMainCategoriesContext = createContext<string[]>([""]);
const themeContext = createContext<IContext<[]>>({
	getter: [],
	setter: () => {},
});

interface IContext<T> {
	getter: T;
	setter: () => void;
}

export const useWikiPath = () => {
	return useContext(WikiPathContext);
};
export const useWikiMainCategories = () => {
	return useContext(WikiMainCategoriesContext);
};

export const WikiProvider = ({ children }: { children: React.ReactNode }) => {
	const [wikiPath, setWikiPath] = useState<string>("");
	const [mainCategories, setMainCategories] = useState<string[]>([""]);

	const handleWikiPathChange: (path: string) => void = (path) => {
		setWikiPath(path);
	};

	const wikiSetter = () => {};

	const wikiPathProvider: IContext<string> = {
		getter: wikiPath,
		setter: wikiSetter,
	};

	const fetchCategories = async () => {
		try {
			const getCategories = await fetchData(API_URL);
			const keys = Object.keys(getCategories);
			setMainCategories([...keys]);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<WikiMainCategoriesContext.Provider value={mainCategories}>
			<WikiPathContext.Provider value={wikiPathProvider}>
				{children}
			</WikiPathContext.Provider>
		</WikiMainCategoriesContext.Provider>
	);
};
