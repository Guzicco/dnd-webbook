import { Card, CardContent, CardHeader } from "@mui/material";
import { ILink } from "../../../App";
import { EWikiStates, useWikiData } from "../WikiContext";
import { assertState } from "../../../Utils/AssertState";
import SortedListAlphabeticaly from "./DisplayComponents/SortedListAlphabeticaly";

export interface EQCategories extends ILink {
  equipment: ILink[];
}

const DisplayEquipmentCategories: React.FC = () => {
  const wikiData = useWikiData();
  assertState(wikiData, EWikiStates.ITEM_PICKED);
  const entryData: EQCategories = wikiData.itemPicked;

  return (
    <Card>
      <CardHeader title={entryData.name}></CardHeader>
      <CardContent>
        <SortedListAlphabeticaly
          itemsList={entryData}
        ></SortedListAlphabeticaly>
      </CardContent>
    </Card>
  );
};

export default DisplayEquipmentCategories;
