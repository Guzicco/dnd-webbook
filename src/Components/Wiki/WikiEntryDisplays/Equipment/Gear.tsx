import { Box, Paper } from "@mui/material";
import Description from "../DisplayComponents/Description";
import { IGear } from "./EQTypesInterface";
import GridItem from "./GridItem";

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
          <GridItem
            header="Equipment Category"
            content={item.equipment_category.name}
            url={item.equipment_category.url}
          ></GridItem>
          <GridItem
            header="Gear Category"
            content={item.gear_category.name}
            url={item.gear_category.url}
          ></GridItem>
          <GridItem
            header="Cost:"
            content={`${item.cost.quantity}${item.cost.unit}`}
          ></GridItem>
          <GridItem header="Weight:" content={`${item.weight}`}></GridItem>
        </Box>
      </Paper>
      {item.desc ? <Description desc={item.desc}></Description> : null}
    </>
  );
};

export default Gear;
