import { Link, List, ListItem, Paper } from "@mui/material";
import { ILink } from "../../../../App";
import { useWikiDataHandler } from "../../WikiContext";
import { EQCategories } from "../DisplayEquipmentCategories";

interface IProps {
  itemsList: EQCategories;
}

const SortedListAlphabeticaly: React.FC<IProps> = ({ itemsList }) => {
  const wikiDataHandler = useWikiDataHandler();
  const sortAlphabetUniqueLetters = (list: ILink[]) => {
    let uniqueLetters = new Set<string>();
    list.map((item) => uniqueLetters.add(item.name.charAt(0)));
    return Array.from(uniqueLetters).sort();
  };
  const sortListByLetter: (letter: string) => ILink[] = (letter) => {
    return itemsList.equipment.filter(
      (item) => item.name.charAt(0) === letter
    ) as ILink[];
  };

  const uniqueLetters = sortAlphabetUniqueLetters(itemsList.equipment);

  return (
    <Paper>
      {uniqueLetters.map((letter: string) => {
        return (
          <List key={letter} sx={{ pl: 2 }}>
            {letter}
            {sortListByLetter(letter).map((entry) => (
              <ListItem key={entry.name}>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => {
                    wikiDataHandler.onInItemLinkClick(entry.url);
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
  );
};

export default SortedListAlphabeticaly;
