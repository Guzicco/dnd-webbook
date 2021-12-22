import { Paper, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ILink } from "../../NavigationBar";
import { useWikiDataHandler } from "../../WikiContext";

interface ISkillsProps {
  skills: ILink[];
}

const SkillsList: React.FC<ISkillsProps> = ({ skills }) => {
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
