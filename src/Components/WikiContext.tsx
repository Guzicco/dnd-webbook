import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../Globals";
import Axios from "axios";
import { ILink } from "./NavigationBar";

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
          name: string;
          itemsList: ILink[];
        };
      };
    }
  | {
      type: EWikiStates.ITEM_PICKED;
      state: {
        categoriesList: ILink[];
        categoryPicked: {
          name: string;
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
  onCategoryPick: (pickedCategory: string) => void;
  onItemPick: (pickedItem: string) => void;
};
const WikiDataContextHandler = createContext<IHandler>({
  onCategoryPick: (pickedCategory: string) => {},
  onItemPick: (pickedItem: string) => {},
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
      const initialData = await Axios.get(`${API_URL}/api`)
        .then((resp) => resp.data)
        .then((data) => Object.entries(data).map((entry) => entry));
      const formattedData = initialData.map((entry) => {
        return { label: entry[0], url: String(entry[1]) };
      });
      setWikiState({
        type: EWikiStates.LOADED,
        state: { categoriesList: formattedData },
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCategoryPick = async (pickedCategory: string) => {
    try {
      const subCategoryData = await Axios.get(`${API_URL}${pickedCategory}`)
        .then((response) => response.data.results)
        .then((data) =>
          data.map(
            (entry: { index: string; name: string; url: string }) => entry
          )
        );
      const formattedData: ILink[] = subCategoryData.map(
        (entry: { index: string; name: string; url: string }) => {
          return {
            label: Object(entry).name,
            url: Object(entry).url,
            index: Object(entry).index,
          };
        }
      );
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
              name: pickedCategory,
              itemsList: formattedData,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemPick: (item: string) => void = async (item) => {
    try {
      const entryData = await Axios.get(`${API_URL}${item}`)
        .then((response) => response.data)
        .then((data) => data);
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
      console.log(entryData);
    } catch (err) {
      console.log(err);
    }
  };

  const wikiStateHandlers: IHandler = {
    onCategoryPick: handleCategoryPick,
    onItemPick: handleItemPick,
  };

  return (
    <WikiDataContext.Provider value={wikiState}>
      <WikiDataContextHandler.Provider value={wikiStateHandlers}>
        {children}
      </WikiDataContextHandler.Provider>
    </WikiDataContext.Provider>
  );
};
