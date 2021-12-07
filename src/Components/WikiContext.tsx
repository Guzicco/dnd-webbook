import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../Globals";
import fetchData from "../Utils/FetchData";

const WikiActiveCategoryContext = createContext<IContext<string>>({
	getter: "",
	onChange: () => {},
});
const WikiMainCategoriesContext = createContext<string[]>([""]);

interface IContext<T> {
	getter: T;
	onChange: (prop: any) => void;
}

interface ICategory<T> {
	apiLink: T;
	data: {};
}

export const useActiveCategory = () => {
	return useContext(WikiActiveCategoryContext);
};
export const useWikiMainCategories = () => {
	return useContext(WikiMainCategoriesContext);
};

export const WikiProvider = ({ children }: { children: React.ReactNode }) => {
	const [wikiActiveCategory, setActiveCategory] = useState<ICategory<string>>({
		apiLink: "",
		data: {},
	});
	const [mainCategories, setMainCategories] = useState<ICategory<string[]>>({
		apiLink: [""],
		data: {},
	});

	const handleActiveCategoryChange: (category: string) => void = async (
		category
	) => {
		try {
			const getData = await fetchData(`${API_URL}/${category}`);
			setActiveCategory({ apiLink: category, data: getData });
			console.log(getData);
		} catch (err) {
			console.log(err);
		}
	};

	const wikiPathProvider: IContext<string> = {
		getter: wikiActiveCategory.apiLink,
		onChange: handleActiveCategoryChange,
	};

	const fetchCategories = async () => {
		try {
			const getCategories = await fetchData(API_URL);
			console.log(getCategories);
			const keys = Object.keys(getCategories);
			setMainCategories({ apiLink: [...keys], data: getCategories });
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<WikiMainCategoriesContext.Provider value={mainCategories.apiLink}>
			<WikiActiveCategoryContext.Provider value={wikiPathProvider}>
				{children}
			</WikiActiveCategoryContext.Provider>
		</WikiMainCategoriesContext.Provider>
	);
};
