import {
  Box,
  Checkbox,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ILink } from "../../../../App";
import React from "react";
import { useWikiDataHandler } from "../../WikiContext";

export interface IChooseOption {
  choose: number;
  from: chooseTypes[];
  type: string;
}

type ideals = {
  alignments: ILink[];
  desc: string;
};
type starting_equipment = {
  equipment_category: ILink;
};

type chooseTypes = string | ideals | starting_equipment | ILink;

interface IChooseProps {
  chooseList: IChooseOption;
}

const ChooseOptions: React.FC<IChooseProps> = ({ chooseList }) => {
  const wikiDataHandler = useWikiDataHandler();
  const [currentSelection, setCurrentSelection] = useState<number[]>([0]);

  const title = `${chooseList.type[0].toUpperCase()}${chooseList.type
    .slice(1)
    .replace("_", " ")}`;

  const setSelection = (index: number) => {
    if (currentSelection.length === chooseList.choose) {
      currentSelection.shift();
    }
    setCurrentSelection([...currentSelection, index]);
  };

  const displayChooseList = (list: chooseTypes[]) => {
    if (typeof list[0] === "string") {
      return list.map((entry, index: number) => (
        <ListItem divider={true} key={index}>
          <Checkbox
            checked={currentSelection.includes(index)}
            onClick={() => {
              setSelection(index);
            }}
          />
          {entry}
        </ListItem>
      ));
    } else if ("alignments" in list[0]) {
      let typedList = list as ideals[];
      return typedList.map((entry, index) => (
        <ListItem divider={true} key={index}>
          <Box sx={{ width: "100%" }}>
            <Box>
              <Checkbox
                checked={currentSelection.includes(index)}
                onClick={() => {
                  setSelection(index);
                }}
              />
              {entry.desc}
            </Box>
            <Box
              sx={{
                width: "100%",
                mx: 6,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              {entry.alignments.map((aligment) => (
                <Link
                  component="button"
                  variant="body1"
                  key={aligment.index}
                  sx={{ p: 1 }}
                  underline="hover"
                  onClick={() =>
                    wikiDataHandler.onInItemLinkClick(aligment.url)
                  }
                >
                  {aligment.name}
                </Link>
              ))}
            </Box>
          </Box>
        </ListItem>
      ));
    } else if ("equipment_category" in list[0]) {
      let typedList = list as starting_equipment[];
      return typedList.map((entry, index) => (
        <ListItem key={index}>
          <Checkbox
            checked={currentSelection.includes(index)}
            onClick={() => {
              setSelection(index);
            }}
          />
          <Link
            component="button"
            variant="body1"
            underline="hover"
            onClick={() =>
              wikiDataHandler.onInItemLinkClick(entry.equipment_category.url)
            }
          >
            {entry.equipment_category.name}
          </Link>
        </ListItem>
      ));
    } else if ("url" in list[0]) {
      let typedList = list as ILink[];
      return typedList.map((entry, index) => (
        <ListItem key={entry.index}>
          <Checkbox
            checked={currentSelection.includes(index)}
            onClick={() => {
              setSelection(index);
            }}
          />
          <Link
            component="button"
            variant="body1"
            underline="hover"
            onClick={() => wikiDataHandler.onInItemLinkClick(entry.url)}
          >
            {entry.name}
          </Link>
        </ListItem>
      ));
    } else {
      return null;
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6" sx={{ pl: 2 }}>
        Pick {chooseList.choose}
      </Typography>
      <List>{displayChooseList(chooseList.from)}</List>
    </Paper>
  );
};

export default ChooseOptions;
