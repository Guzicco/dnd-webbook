import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../Globals";
import Axios from "axios";
import { ILink } from "./NavigationBar";

interface ICharacterTrait {
  // strength
  id: string;
  title: string;
  description: string;
}
interface ICharacterAbility {
  // melee
  id: string;
  title: string;
  description: string;
}

type IWikiConcreteEntry = ICharacterTrait | ICharacterAbility;
export enum EWikiStates {
  "INITIAL",
  "LOADING",
  "LOADED",
  "CATEGORY_PICKED",
  "SUBCATEGORY_PICKED",
  "ITEM_PICKED",
}
export type IState =
  // WARN: some categories might not have subcategories/items
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
          subcategories: ILink[];
        };
      };
    }
  | {
      type: EWikiStates.SUBCATEGORY_PICKED;
      state: {
        categoriesList: ILink[];
        categoryPicked: {
          name: string;
          subcategories: ILink[];
        };
        subCategoryPicked: {
          name: string;
          wikiEntries: ILink[];
        };
      };
    }
  | {
      type: EWikiStates.ITEM_PICKED;
      state: {
        categoriesList: ILink[];
        categoryPicked: {
          name: string;
          subcategories: ILink[];
        };
        subCategoryPicked: {
          name: string;
          wikiEntries: ILink[];
        };
        item: IWikiConcreteEntry;
      };
    };

const WikiDataContext = createContext<IState>({ type: EWikiStates.INITIAL });

export const useWikiData = () => {
  return useContext(WikiDataContext);
};

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
      const initialData = await Axios.get(API_URL)
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

  return (
    <WikiDataContext.Provider value={wikiState}>
      {children}
    </WikiDataContext.Provider>
  );
};
