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

type equipment_category = {
  equipment_category: ILink[];
};
type ideals = {
  alignments: ILink[];
  desc: string;
};

type chooseTypes = string | equipment_category | ideals | ILink;

interface IChooseProps {
  chooseList: IChooseOption;
}

const ChooseOptions: React.FC<IChooseProps> = ({ chooseList }) => {
  const wikiDataHandler = useWikiDataHandler();
  const [currentSelection, setCurrentSelection] = useState<number[]>([0]);
  const title = `${chooseList.type[0].toUpperCase()}${chooseList.type.slice(
    1
  )}`;

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
    } else if ("equipment_category" in list[0]) {
      return <></>;
    } else if ("alignments" in list[0]) {
      let typedList = list as ideals[];
      return typedList.map((entry, index: number) => (
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
    } else {
      return null;
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6" sx={{ pl: 2 }}>
        Pick {chooseList.choose}
      </Typography>
      <List>{displayChooseList(chooseList.from)}</List>
    </Paper>
  );
};

export default ChooseOptions;
