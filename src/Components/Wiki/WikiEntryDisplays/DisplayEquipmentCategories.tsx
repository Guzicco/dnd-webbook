import { Box, CardHeader, List, ListItem, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";

interface EQCategories extends ILink {
  equipment: ILink[];
}

const DisplayEquipmentCategories: React.FC = () => {
  const [tabValue, setTabValue] = useState<string>("1");
  const wikiData = useWikiData();
  const entryData: EQCategories =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const sortAlphabetUniqueLetters = (list: ILink[]) => {
    let uniqueLetters = new Set<string>();
    list.map((item) => uniqueLetters.add(item.name.charAt(0)));
    return Array.from(uniqueLetters).sort();
  };
  const uniqueLetters = sortAlphabetUniqueLetters(entryData.equipment);
  const filteredEquipment = entryData.equipment.filter(
    (item) => item.name.charAt(0) === tabValue
  );
  console.log(filteredEquipment);

  return (
    <>
      <CardHeader title={entryData.name}></CardHeader>
      <Box sx={{ width: "100%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {uniqueLetters.map((letter) => (
                <Tab key={letter} label={letter} value={letter}></Tab>
              ))}
            </TabList>
          </Box>
          {uniqueLetters.map((letter) => (
            <TabPanel value={letter}>
              <List>
                {filteredEquipment.map((item) => (
                  <ListItem key={item.index}>{item.name}</ListItem>
                ))}
              </List>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default DisplayEquipmentCategories;
