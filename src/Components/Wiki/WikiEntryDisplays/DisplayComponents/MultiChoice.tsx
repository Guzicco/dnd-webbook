import { Paper, Typography } from "@mui/material";
import ChooseOptions, { IChooseOption } from "./ChooseOptions";

interface IMultiChoiceProps {
  title: string;
  list: IChooseOption[];
}

const MultiChoice: React.FC<IMultiChoiceProps> = ({ title, list }) => {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h5">{title}</Typography>
      {list.map((entry: IChooseOption, index) => (
        <ChooseOptions key={index} chooseList={entry} />
      ))}
    </Paper>
  );
};

export default MultiChoice;
