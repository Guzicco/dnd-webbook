import { Paper, Typography } from "@mui/material";
import React from "react";

interface IProps {
  desc: string[] | string;
}

const Description: React.FC<IProps> = ({ desc }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Description</Typography>
      {Array.isArray(desc) ? (
        desc.map((part, index) => <Typography key={index}>{part}</Typography>)
      ) : (
        <Typography>{desc}</Typography>
      )}
    </Paper>
  );
};

export default Description;
