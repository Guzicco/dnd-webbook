import { CardContent, CardHeader } from "@mui/material";
import { EWikiStates, useWikiData } from "../WikiContext";
import { IDisplay } from "../WikiEntryDisplay";
import Description from "./DisplayComponents/Description";

interface IAlignments extends IDisplay {
  abbreviation: string;
}

const DisplayAlignments: React.FC = () => {
  const wikiData = useWikiData();
  const entryData: IAlignments =
    wikiData.type === EWikiStates.ITEM_PICKED ? wikiData.itemPicked : {};
  return (
    <>
      <CardHeader
        title={`${entryData.name} - ${entryData.abbreviation}`}
      ></CardHeader>
      <CardContent>
        <Description desc={entryData.desc}></Description>
      </CardContent>
    </>
  );
};

export default DisplayAlignments;
