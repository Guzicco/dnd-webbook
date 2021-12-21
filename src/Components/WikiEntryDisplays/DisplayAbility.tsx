import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { EWikiStates, useWikiData } from "../WikiContext";

interface IAbilityScore {
  index: string;
  full_name: string;
  desc: [];
  skills: [];
  url: string;
  name: string;
}

const DisplayAbility = () => {
  const wikiData = useWikiData();
  const entryData: IAbilityScore =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title={entryData.full_name}></CardHeader>
      <CardContent>
        {entryData.desc.map((part) => (
          <Typography>{part}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default DisplayAbility;
