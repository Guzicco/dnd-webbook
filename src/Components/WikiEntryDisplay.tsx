import React from "react";
import { ILink } from "./NavigationBar";
import { EWikiStates, useWikiData } from "./WikiContext";
import DisplayAbility from "./WikiEntryDisplays/DisplayAbility";
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
  desc: string[];
}

const WikiEntryDisplay = () => {
  const wikiData = useWikiData();
  if (wikiData.type === EWikiStates.ITEM_PICKED) {
    switch (wikiData.state.categoryPicked.type) {
      case EWikiEntryType["ability-scores"]: {
        return <DisplayAbility></DisplayAbility>;
      }
      case EWikiEntryType["alignments"]: {
        return <div>there will be alignments</div>;
      }
      case EWikiEntryType["skills"]: {
        return <DisplaySkills></DisplaySkills>;
      }
      default:
        return <div>not yet implemented</div>;
    }
  }
  return <></>;
};

export default WikiEntryDisplay;
