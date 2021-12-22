import { Paper, Typography } from "@mui/material";
import React from "react";

interface IProps {
  desc: string[];
}

const Description: React.FC<IProps> = ({ desc }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Description</Typography>
      {desc ? (
        desc.map((part, index) => <Typography key={index}>{part}</Typography>)
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default Description;
