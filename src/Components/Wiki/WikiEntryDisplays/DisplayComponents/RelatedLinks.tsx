import { Paper, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ILink } from "../../../../App";
import { useWikiDataHandler } from "../../WikiContext";

interface IRelatedLinksProps {
  relatedLinks: ILink[];
}

const RelatedLinks: React.FC<IRelatedLinksProps> = ({ relatedLinks }) => {
  const wikiDataHandler = useWikiDataHandler();
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5">Skills</Typography>
      <List>
        {relatedLinks.map((link) => (
          <ListItem key={link.index}>
            <Link
              underline="hover"
              onClick={() => {
                wikiDataHandler.onInItemLinkClick(link.url);
              }}
            >
              {link.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RelatedLinks;
