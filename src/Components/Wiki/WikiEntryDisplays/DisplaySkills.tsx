import { CardContent, CardHeader } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import Description from "./DisplayComponents/Description";
import RelatedLinks from "./DisplayComponents/RelatedLinks";

interface ISkills extends IDisplay {
  ability_score: ILink;
}

const DisplaySkills: React.FC = () => {
  const wikiData = useWikiData();
  const entryData: ISkills =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.itemPicked : {};
  console.log(entryData);
  return (
    <>
      <CardHeader title={entryData.name}></CardHeader>
      <CardContent>
        <Description desc={entryData.desc}></Description>
        <RelatedLinks relatedLinks={entryData.ability_score}></RelatedLinks>
      </CardContent>
    </>
  );
};

export default DisplaySkills;
