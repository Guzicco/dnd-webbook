import { Paper, Typography } from "@mui/material";
import React from "react";

interface IDescriptionProps {
  desc: string[] | string;
  name?: string;
}

const Description: React.FC<IDescriptionProps> = ({ desc, name }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Description</Typography>
      {Array.isArray(desc) ? (
        desc.map((part, index) => (
          <Typography sx={{ pt: 1 }} key={index}>
            {part}
          </Typography>
        ))
      ) : (
        <Typography>{desc}</Typography>
      )}
      {name ? (
        <Typography sx={{ pt: 1 }} variant="h6">
          Example:<Typography>{name}</Typography>
        </Typography>
      ) : null}
    </Paper>
  );
};

export default Description;
