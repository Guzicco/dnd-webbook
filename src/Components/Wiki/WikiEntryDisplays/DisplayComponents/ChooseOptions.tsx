import { Paper } from "@mui/material";
import { ILink } from "../../../../App";

export interface IChooseOption<T> {
  choose: number;
  from: T;
  type: string;
}

interface IChooseOptionsProps {
  chooseList:
    | IChooseOption<string[]>
    | IChooseOption<{ equipment_category: ILink }>;
}

const ChooseOptions: React.FC<IChooseOptionsProps> = ({ chooseList }) => {
  console.log(chooseList);
  return <Paper></Paper>;
};

export default ChooseOptions;
