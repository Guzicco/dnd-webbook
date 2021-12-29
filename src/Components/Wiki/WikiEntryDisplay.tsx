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

export const EWikiEntryTypes = [
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
] as const;

export type EWikiEntryType = typeof EWikiEntryTypes[number];

export interface IDisplay extends ILink {
  desc: string[] | string;
}

const WikiEntryDisplay = () => {
  const wikiData = useWikiData();

  const EntryDisplayed = (data: IState) => {
    if (data.type === EWikiStates.ITEM_PICKED) {
      switch (data.categoryPicked.type) {
        case "ability-scores": {
          return <DisplayAbility></DisplayAbility>;
        }
        case "alignments": {
          return <DisplayAlignments></DisplayAlignments>;
        }
        case "skills": {
          return <DisplaySkills></DisplaySkills>;
        }
        case "backgrounds": {
          return <DisplayBackgrounds></DisplayBackgrounds>;
        }
        case "equipment": {
          return <DisplayEquipment></DisplayEquipment>;
        }
        case "equipment-categories": {
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
