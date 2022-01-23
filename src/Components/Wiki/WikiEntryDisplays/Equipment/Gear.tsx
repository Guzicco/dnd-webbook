import { Box, Paper } from "@mui/material";
import Description from "../DisplayComponents/Description";
import { gridItem } from "../DisplayEquipment";
import { IGear } from "./EQTypesInterface";

interface IProps {
  item: IGear;
}

const Gear: React.FC<IProps> = ({ item }) => {
  return (
    <>
      <Paper>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          rowGap="10px"
          alignItems="center"
          sx={{ p: 2 }}
        >
          {gridItem("Equipment Category", item.equipment_category.name)}
          {gridItem("Gear Category", item.gear_category.name)}
          {gridItem("Cost:", `${item.cost.quantity}${item.cost.unit}`)}
          {gridItem("Weight:", `${item.weight}`)}
        </Box>
      </Paper>
      {item.desc ? <Description desc={item.desc}></Description> : null}
    </>
  );
};

export default Gear;
