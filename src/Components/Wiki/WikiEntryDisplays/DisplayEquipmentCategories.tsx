import { Box, CardHeader, Link, List, ListItem, Paper } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData, useWikiDataHandler } from "../WikiContext";
import { assertState } from "../../../Utils/AssertState";

interface EQCategories extends ILink {
  equipment: ILink[];
}

const DisplayEquipmentCategories: React.FC = () => {
  const wikiData = useWikiData();
  const wikiDataHanlder = useWikiDataHandler();

  assertState(wikiData, EWikiStates.ITEM_PICKED);
  const entryData: EQCategories = wikiData.itemPicked;

  console.log(entryData);

  const sortAlphabetUniqueLetters = (list: ILink[]) => {
    let uniqueLetters = new Set<string>();
    list.map((item) => uniqueLetters.add(item.name.charAt(0)));
    return Array.from(uniqueLetters).sort();
  };
  const sortListByLetter: (letter: string) => ILink[] = (letter) => {
    return entryData.equipment.filter(
      (item) => item.name.charAt(0) === letter
    ) as ILink[];
  };
  const uniqueLetters = sortAlphabetUniqueLetters(entryData.equipment);

  return (
    <>
      <CardHeader title={entryData.name}></CardHeader>
      <Box>
        <Paper>
          {uniqueLetters.map((letter: string) => {
            return (
              <List key={letter} sx={{ pl: 2 }}>
                {letter}
                {sortListByLetter(letter).map((entry) => (
                  <ListItem key={entry.index}>
                    <Link
                      onClick={() => {
                        wikiDataHanlder.onInItemLinkClick(entry.url);
                      }}
                    >
                      {entry.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            );
          })}
        </Paper>
      </Box>
    </>
  );
};

export default DisplayEquipmentCategories;
