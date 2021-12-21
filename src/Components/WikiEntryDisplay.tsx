import React from "react";
import { EWikiStates, useWikiData } from "./WikiContext";
import DisplayAbility from "./WikiEntryDisplays/DisplayAbility";

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
      default:
        return <div>not yet implemented</div>;
    }
  }
  return <></>;
};

export default WikiEntryDisplay;
