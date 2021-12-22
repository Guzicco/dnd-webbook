import { Paper, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ILink } from "../../../../App";
import { useWikiDataHandler } from "../../WikiContext";

interface ISkillsListProps {
  skills: ILink[];
}

const SkillsList: React.FC<ISkillsListProps> = ({ skills }) => {
  const wikiDataHandler = useWikiDataHandler();

  return skills.length !== 0 ? (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5">Skills</Typography>
      <List>
        {skills.map((skill) => (
          <ListItem key={skill.index}>
            <Link
              underline="hover"
              onClick={() => {
                wikiDataHandler.onInItemLinkClick(skill.url);
              }}
            >
              {skill.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  ) : (
    <></>
  );
};

export default SkillsList;
