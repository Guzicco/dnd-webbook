import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import { ILink } from "../NavigationBar";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import Description from "./DisplayComponents/Description";
import SkillsList from "./DisplayComponents/SkillsList";

interface IAbilityScore extends IDisplay {
  full_name: string;
  skills: ILink[] | [];
}

const DisplayAbility = () => {
  const wikiData = useWikiData();
  const entryData: IAbilityScore =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title={entryData.full_name}></CardHeader>
      <CardContent>
        <Description desc={entryData.desc}></Description>
        <SkillsList skills={entryData.skills}></SkillsList>
      </CardContent>
    </Card>
  );
};

export default DisplayAbility;
