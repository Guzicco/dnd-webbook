import { Paper, Typography } from "@mui/material";
import React from "react";

interface IDescriptionProps {
  desc: string[] | string;
  name?: string;
}

const Description: React.FC<IDescriptionProps> = ({ desc, name }) => {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h5">Description</Typography>
      {Array.isArray(desc) ? (
        desc.map((part, index) => (
          <Typography variant="body1" key={index}>
            {part}
          </Typography>
        ))
      ) : (
        <Typography variant="body1">{desc}</Typography>
      )}
      {name ? (
        <Typography sx={{ pt: 1 }} variant="body1">
          Example:<Typography>{name}</Typography>
        </Typography>
      ) : null}
    </Paper>
  );
};

export default Description;
