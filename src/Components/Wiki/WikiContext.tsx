import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../../Globals";
import Axios from "axios";
import { IGenericLink, ILink } from "../../App";
import FixURL from "../../Utils/FixURL";
import { EWikiEntryType } from "./WikiEntryDisplay";
import { assertState } from "../../Utils/AssertState";

// Context/Data structure
export enum EWikiStates {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  LOADED = "LOADED",
  CATEGORY_PICKED = "CATEGORY_PICKED",
  ITEM_PICKED = "ITEM_PICKED",
}

type ICategoryLink = IGenericLink<EWikiEntryType>;

export type IState =
  | { type: EWikiStates.INITIAL }
  | { type: EWikiStates.LOADING }
  | {
      type: EWikiStates.LOADED;
      categoriesList: ICategoryLink[];
    }
  | {
      type: EWikiStates.CATEGORY_PICKED;
      categoriesList: ICategoryLink[];
      categoryPicked: {
        type: EWikiEntryType;
        url: string;
        itemsList: ILink[];
      };
    }
  | {
      type: EWikiStates.ITEM_PICKED;
      categoriesList: ICategoryLink[];
      categoryPicked: {
        type: EWikiEntryType;
        url: string;
        itemsList: ILink[];
      };
      itemPicked: any; //logic is handled in WikiEntryDisplay
    };

const WikiDataContext = createContext<IState>({ type: EWikiStates.INITIAL });
export const useWikiData = () => {
  return useContext(WikiDataContext);
};

// Context/Data Handling logic
export type IHandler = {
  onCategoryPick: (
    pickedCategoryURL: string,
    pickedCategoryLabel: EWikiEntryType
  ) => void;
  onItemPick: (pickedItemURL: string) => void;
  onInItemLinkClick: (inItemURL: string) => void;
};
const WikiDataContextHandler = createContext<IHandler>({
  onCategoryPick: (
    pickedCategoryURL: string,
    pickedCategoryLabel: string
  ) => {},
  onItemPick: (pickedItemURL: string) => {},
  onInItemLinkClick: (inItemURL: string) => {},
});
export const useWikiDataHandler = () => {
  return useContext(WikiDataContextHandler);
};

// Component wrapping all functionality
export const WikiDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wikiState, setWikiState] = useState<IState>({
    type: EWikiStates.INITIAL,
  });

  const fetchInitialData = async () => {
    setWikiState({ type: EWikiStates.LOADING });
    try {
      const initialData: ICategoryLink[] = await Axios.get(
        `${API_URL}/api`
      ).then((response) => {
        return Object.keys(response.data).map((key) => {
          // TODO - verify if key is of type EWikiEntryType
          return { name: key as EWikiEntryType, url: response.data[key] };
        });
      });
      setWikiState({
        type: EWikiStates.LOADED,
        categoriesList: initialData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCategoryPick = async (
    pickedCategoryURL: string,
    pickedCategoryLabel: EWikiEntryType
  ) => {
    try {
      const pickedCategoryData = await Axios.request<ILink[]>({
        url: `${API_URL}${pickedCategoryURL}`,
        transformResponse: [(data) => JSON.parse(data).results],
      }).then((response) => response.data.map((entry) => entry));

      assertState(
        wikiState,
        EWikiStates.LOADED,
        EWikiStates.CATEGORY_PICKED,
        EWikiStates.ITEM_PICKED
      );

      setWikiState({
        type: EWikiStates.CATEGORY_PICKED,
        categoriesList: wikiState.categoriesList,
        categoryPicked: {
          type: pickedCategoryLabel,
          url: pickedCategoryURL,
          itemsList: pickedCategoryData,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemPick: (pickedItemURL: string) => void = async (
    pickedItemURL
  ) => {
    try {
      const entryData = await Axios.get(
        `${API_URL}${FixURL(pickedItemURL)}`
      ).then((response) => response.data);

      assertState(
        wikiState,
        EWikiStates.CATEGORY_PICKED,
        EWikiStates.ITEM_PICKED
      );

      setWikiState({
        type: EWikiStates.ITEM_PICKED,
        categoriesList: wikiState.categoriesList,
        categoryPicked: wikiState.categoryPicked,
        itemPicked: entryData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRedirectFromItem: (inItemURL: string) => void = async (
    inItemURL: string
  ) => {
    const fixedURL = FixURL(inItemURL);
    const categoryURL = fixedURL.slice(0, fixedURL.lastIndexOf("/"));
    const categoryName = categoryURL.slice(
      categoryURL.lastIndexOf("/") + 1
    ) as EWikiEntryType;
    // check if categoryName is EWikiEntryType
    try {
      const entryData = await Axios.get(`${API_URL}${FixURL(inItemURL)}`).then(
        (response) => response.data
      );
      const categoryData = await Axios.request<ILink[]>({
        url: `${API_URL}${categoryURL}`,
        transformResponse: [
          (data) => {
            return JSON.parse(data).results;
          },
        ],
      }).then((response) => response.data.map((entry: ILink) => entry));
      const formattedCategoryData: ILink[] = categoryData.map((entry) => {
        return {
          name: entry.name,
          url: entry.url,
          index: entry.index,
        };
      });
      assertState(wikiState, EWikiStates.ITEM_PICKED);
      setWikiState({
        type: EWikiStates.ITEM_PICKED,
        categoriesList: wikiState.categoriesList,
        categoryPicked: {
          type: categoryName,
          url: `${categoryURL}`,
          itemsList: formattedCategoryData,
        },
        itemPicked: entryData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const wikiStateHandlers: IHandler = {
    onCategoryPick: handleCategoryPick,
    onItemPick: handleItemPick,
    onInItemLinkClick: handleRedirectFromItem,
  };

  return (
    <WikiDataContext.Provider value={wikiState}>
      <WikiDataContextHandler.Provider value={wikiStateHandlers}>
        {children}
      </WikiDataContextHandler.Provider>
    </WikiDataContext.Provider>
  );
};
