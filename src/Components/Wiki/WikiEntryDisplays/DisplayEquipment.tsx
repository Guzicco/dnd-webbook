import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { assertState } from "../../../Utils/AssertState";
import { EWikiStates, useWikiData, useWikiDataHandler } from "../WikiContext";
import { EQCategory, EQInterface, IGear } from "./Equipment/EQTypesInterface";
import Gear from "./Equipment/Gear";

const DisplayEquipment: React.FC = () => {
  const wikiData = useWikiData();
  assertState(wikiData, EWikiStates.ITEM_PICKED);
  const entryData: EQInterface = wikiData.itemPicked;
  console.log(entryData);

  const displayByEQCategory: (item: EQInterface) => JSX.Element = (item) => {
    switch (item.equipment_category.name as EQCategory) {
      case "Tools": {
        return <></>;
      }
      case "Adventuring Gear": {
        return <Gear item={item as unknown as IGear}></Gear>;
      }
      case "Armor": {
        return <></>;
      }
      case "Weapon": {
        return <></>;
      }
      case "Mounts and Vehicles": {
        return <></>;
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <Card>
      <CardHeader title={entryData.name}></CardHeader>
      <CardContent>{displayByEQCategory(entryData)}</CardContent>
    </Card>
  );
};

export default DisplayEquipment;
