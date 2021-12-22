import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import { EWikiStates, useWikiData, useWikiDataHandler } from "../WikiContext";

interface IAbilityScore {
  index: string;
  full_name: string;
  desc: [];
  skills: [{ name: string; index: string; url: string }] | [];
  url: string;
  name: string;
}

const DisplayAbility = () => {
  const wikiData = useWikiData();
  const wikiDataHandler = useWikiDataHandler();
  const entryData: IAbilityScore =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title={entryData.full_name}></CardHeader>
      <CardContent>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Description</Typography>
          {entryData.desc.map((part) => (
            <Typography>{part}</Typography>
          ))}
        </Paper>
        {entryData.skills.length !== 0 ? (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5">Skills</Typography>
            <List>
              {entryData.skills.map((skill) => (
                <ListItem key={skill.index}>
                  <Link
                    underline="hover"
                    onClick={() => {
                      wikiDataHandler.onInItemLinkClick(skill.url);
                    }}
                  >
                    {skill.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default DisplayAbility;
