import { CardContent, CardHeader } from "@mui/material";
import React from "react";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import Description from "./DisplayComponents/Description";
import RelatedLinks from "./DisplayComponents/RelatedLinks";

interface IAbilityScore extends IDisplay {
  full_name: string;
  skills: ILink[];
}

const DisplayAbility: React.FC = () => {
  const wikiData = useWikiData();
  const entryData: IAbilityScore =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.itemPicked : {};
  return (
    <>
      <CardHeader title={entryData.full_name}></CardHeader>
      <CardContent>
        <Description desc={entryData.desc}></Description>
        <RelatedLinks relatedLinks={entryData.skills}></RelatedLinks>
      </CardContent>
    </>
  );
};

export default DisplayAbility;
