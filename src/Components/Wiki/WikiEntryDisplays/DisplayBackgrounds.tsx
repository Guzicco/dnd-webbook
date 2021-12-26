import { CardContent, CardHeader } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import ChooseOptions, {
  IChooseOption,
} from "./DisplayComponents/ChooseOptions";
import Description from "./DisplayComponents/Description";
import EquipmentList, { Equipment } from "./DisplayComponents/EquipmentList";
import MultiChoice from "./DisplayComponents/MultiChoice";
import RelatedLinks from "./DisplayComponents/RelatedLinks";

interface IBackgrounds extends IDisplay {
  bonds: IChooseOption;
  feature: { desc: string[]; name: string };
  flaws: IChooseOption;
  ideals: IChooseOption;
  language_options: IChooseOption;
  personality_traits: IChooseOption;
  starting_equipment: Equipment[];
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
        <ChooseOptions chooseList={entryData.personality_traits} />
        <ChooseOptions chooseList={entryData.flaws} />
        <ChooseOptions chooseList={entryData.language_options} />
        <EquipmentList
          title={"Starting Equipment"}
          equipmentList={entryData.starting_equipment}
        />
        <MultiChoice
          title={"Starting Equipment Options"}
          list={entryData.starting_equipment_options}
        />
        <RelatedLinks
          relatedLinks={entryData.starting_proficiencies}
        ></RelatedLinks>
      </CardContent>
    </>
  );
};

export default DisplayBackgrounds;
