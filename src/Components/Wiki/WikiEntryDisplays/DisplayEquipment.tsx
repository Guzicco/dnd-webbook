import { EWikiStates, useWikiData } from "../WikiContext";

const DisplayEquipment: React.FC = () => {
  const wikiData = useWikiData();
  const entryData =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);
  return <>equip</>;
};

export default DisplayEquipment;
