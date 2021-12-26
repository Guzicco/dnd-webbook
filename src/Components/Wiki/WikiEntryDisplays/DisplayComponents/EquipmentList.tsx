import { Paper, Typography } from "@mui/material";
import { ILink } from "../../../../App";

export type Equipment = {
  equipment: ILink;
  quantity: number;
};

interface EquipmnetProps {
  equipmentList: Equipment[];
  title: string;
}

const EquipmentList: React.FC<EquipmnetProps> = ({ equipmentList, title }) => {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h5">{title}</Typography>
      {equipmentList.map((entry) => (
        <></>
      ))}
    </Paper>
  );
};

export default EquipmentList;
