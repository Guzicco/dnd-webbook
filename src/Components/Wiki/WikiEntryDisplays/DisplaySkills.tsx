import { ILink } from "../../../App";
import { EWikiStates, useWikiData, useWikiDataHandler } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";

interface ISkills extends IDisplay {
  ability_score: ILink[] | [];
}

const DisplaySkills: React.FC = () => {
  const wikiData = useWikiData();
  const wikiDataHandler = useWikiDataHandler();
  const entryData: ISkills =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);
  return <div>skills</div>;
};

export default DisplaySkills;
