import { CardContent, CardHeader } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import ChooseOptions, {
  IChooseOption,
} from "./DisplayComponents/ChooseOptions";
import Description from "./DisplayComponents/Description";

interface IBackgrounds extends IDisplay {
  bonds: IChooseOption<string[]>;
  feature: { desc: string[]; name: string };
  flaws: IChooseOption<string[]>;
  ideals: IChooseOption<string[]>;
  language_options: IChooseOption<string[]>;
  personality_traits: IChooseOption<string[]>;
  starting_equipment: { equipment: ILink; quantity: number }[];
  starting_equipment_options: IChooseOption<{ equipment_category: ILink }>; // interface implementation @equipment category
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
        ></Description>
        <ChooseOptions chooseList={entryData.flaws}></ChooseOptions>
      </CardContent>
    </>
  );
};

export default DisplayBackgrounds;
