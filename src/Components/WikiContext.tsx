import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../Globals";
import Axios from "axios";
import { ILink } from "./NavigationBar";
import { EWikiEntryType } from "./WikiEntryDisplay";
import FixURL from "../Utils/FixURL";

// Context/Data structure
export enum EWikiStates {
  INITIAL,
  LOADING,
  LOADED,
  CATEGORY_PICKED,
  ITEM_PICKED,
}

export type IState =
  | { type: EWikiStates.INITIAL }
  | { type: EWikiStates.LOADING }
  | {
      type: EWikiStates.LOADED;
      state: {
        categoriesList: ILink[];
      };
    }
  | {
      type: EWikiStates.CATEGORY_PICKED;
      state: {
        categoriesList: ILink[];
        categoryPicked: {
          type: number;
          url: string;
          itemsList: ILink[];
        };
      };
    }
  | {
      type: EWikiStates.ITEM_PICKED;
      state: {
        categoriesList: ILink[];
        categoryPicked: {
          type: number;
          url: string;
          itemsList: ILink[];
        };
        itemPicked: any; //logic is handled in WikiEntryDisplay
      };
    };

const WikiDataContext = createContext<IState>({ type: EWikiStates.INITIAL });
export const useWikiData = () => {
  return useContext(WikiDataContext);
};

// Context/Data Handling logic
export type IHandler = {
  onCategoryPick: (
    pickedCategoryURL: string,
    pickedCategoryLabel: string
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
      const initialData: ILink[] = await Axios.get(`${API_URL}/api`).then(
        (response) => {
          return Object.entries(response.data).map((entry) => {
            return { name: entry[0] as string, url: entry[1] as string };
          });
        }
      );
      setWikiState({
        type: EWikiStates.LOADED,
        state: { categoriesList: initialData },
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
    pickedCategoryLabel: string
  ) => {
    try {
      const pickedCategoryData = await Axios.request<ILink[]>({
        url: `${API_URL}${pickedCategoryURL}`,
        transformResponse: [(data) => JSON.parse(data).results],
      }).then((response) => response.data.map((entry) => entry));
      if (
        wikiState.type === EWikiStates.LOADED ||
        wikiState.type === EWikiStates.CATEGORY_PICKED ||
        wikiState.type === EWikiStates.ITEM_PICKED
      ) {
        setWikiState({
          type: EWikiStates.CATEGORY_PICKED,
          state: {
            categoriesList: wikiState.state.categoriesList,
            categoryPicked: {
              type: EWikiEntryType[
                pickedCategoryLabel as keyof typeof EWikiEntryType
              ],
              url: pickedCategoryURL,
              itemsList: pickedCategoryData,
            },
          },
        });
      }
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
      if (
        wikiState.type === EWikiStates.CATEGORY_PICKED ||
        wikiState.type === EWikiStates.ITEM_PICKED
      ) {
        setWikiState({
          type: EWikiStates.ITEM_PICKED,
          state: {
            categoriesList: wikiState.state.categoriesList,
            categoryPicked: wikiState.state.categoryPicked,
            itemPicked: entryData,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRedirectFromItem: (inItemURL: string) => void = async (
    inItemURL: string
  ) => {
    const fixedURL = FixURL(inItemURL);
    const categoryURL = fixedURL.slice(0, fixedURL.lastIndexOf("/"));
    const categoryName = categoryURL.slice(categoryURL.lastIndexOf("/") + 1);
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
      if (wikiState.type === EWikiStates.ITEM_PICKED) {
        setWikiState({
          type: EWikiStates.ITEM_PICKED,
          state: {
            categoriesList: wikiState.state.categoriesList,
            categoryPicked: {
              type: EWikiEntryType[categoryName as keyof typeof EWikiEntryType],
              url: `${categoryURL}`,
              itemsList: formattedCategoryData,
            },
            itemPicked: entryData,
          },
        });
      }
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
