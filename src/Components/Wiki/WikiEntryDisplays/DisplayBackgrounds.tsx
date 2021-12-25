import { CardContent, CardHeader } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import ChooseOptions, {
  IChooseOption,
} from "./DisplayComponents/ChooseOptions";
import Description from "./DisplayComponents/Description";
import RelatedLinks from "./DisplayComponents/RelatedLinks";

interface IBackgrounds extends IDisplay {
  bonds: IChooseOption;
  feature: { desc: string[]; name: string };
  flaws: IChooseOption;
  ideals: IChooseOption;
  language_options: IChooseOption;
  personality_traits: IChooseOption;
  starting_equipment: { equipment: ILink; quantity: number }[];
  starting_equipment_options: IChooseOption[];
  starting_proficiencies: ILink[];
}
const DisplayBackgrounds: React.FC = () => {
  const wikiData = useWikiData();
  const entryData: IBackgrounds =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.state.itemPicked : {};
  console.log(entryData);
  return (
    <>
      <CardHeader title={entryData.name}></CardHeader>
      <CardContent>
        <Description
          desc={entryData.feature.desc}
          name={entryData.feature.name}
        />
        <ChooseOptions chooseList={entryData.bonds} />
        <ChooseOptions chooseList={entryData.ideals} />
        {/* <ChooseOptions chooseList={entryData.starting_equipment_options} /> */}
        <ChooseOptions chooseList={entryData.flaws} />
        <ChooseOptions chooseList={entryData.language_options} />
        <ChooseOptions chooseList={entryData.personality_traits} />
        <RelatedLinks
          relatedLinks={entryData.starting_proficiencies}
        ></RelatedLinks>
      </CardContent>
    </>
  );
};

export default DisplayBackgrounds;
