import { Card } from "@mui/material";
import React from "react";
import { ILink } from "../../App";
import { EWikiStates, IState, useWikiData } from "./WikiContext";
import DisplayAbility from "./WikiEntryDisplays/DisplayAbility";
import DisplayAlignments from "./WikiEntryDisplays/DisplayAlignments";
import DisplayBackgrounds from "./WikiEntryDisplays/DisplayBackgrounds";
import DisplayEquipment from "./WikiEntryDisplays/DisplayEquipment";
import DisplayEquipmentCategories from "./WikiEntryDisplays/DisplayEquipmentCategories";
import DisplaySkills from "./WikiEntryDisplays/DisplaySkills";

export enum EWikiEntryType {
  "ability-scores",
  "alignments",
  "backgrounds",
  "classes",
  "conditions",
  "damage-types",
  "equipment-categories",
  "equipment",
  "feats",
  "features",
  "languages",
  "magic-items",
  "magic-schools",
  "monsters",
  "proficiencies",
  "races",
  "rules",
  "rule-sections",
  "skills",
  "spells",
  "subclasses",
  "subraces",
  "traits",
  "weapon-properties",
}

export interface IDisplay extends ILink {
  desc: string[] | string;
}

const WikiEntryDisplay = () => {
  const wikiData = useWikiData();

  const EntryDisplayed = (data: IState) => {
    if (data.type === EWikiStates.ITEM_PICKED) {
      switch (data.categoryPicked.type) {
        case EWikiEntryType["ability-scores"]: {
          return <DisplayAbility></DisplayAbility>;
        }
        case EWikiEntryType["alignments"]: {
          return <DisplayAlignments></DisplayAlignments>;
        }
        case EWikiEntryType["skills"]: {
          return <DisplaySkills></DisplaySkills>;
        }
        case EWikiEntryType["backgrounds"]: {
          return <DisplayBackgrounds></DisplayBackgrounds>;
        }
        case EWikiEntryType["equipment"]: {
          return <DisplayEquipment></DisplayEquipment>;
        }
        case EWikiEntryType["equipment-categories"]: {
          return <DisplayEquipmentCategories></DisplayEquipmentCategories>;
        }

        default:
          return <div>not yet implemented</div>;
      }
    }
  };

  return <Card sx={{ mt: 3 }}>{EntryDisplayed(wikiData)}</Card>;
};

export default WikiEntryDisplay;
