import { ILink } from "../NavigationBar";
import { EWikiStates, useWikiData, useWikiDataHandler } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";

interface ISkills extends IDisplay {
  desc: [];
}

const DisplaySkills = () => {
  const wikiData = useWikiData();
  const wikiDataHandler = useWikiDataHandler();
  const entryData =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);
  return <div>skills</div>;
};

export default DisplaySkills;
