import { Paper, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ILink } from "../../../../App";
import { useWikiDataHandler } from "../../WikiContext";

interface IRelatedLinksProps {
  relatedLinks: ILink[] | ILink;
}

const RelatedLinks: React.FC<IRelatedLinksProps> = ({ relatedLinks }) => {
  const wikiDataHandler = useWikiDataHandler();
  if (Array.isArray(relatedLinks) && relatedLinks.length !== 0) {
    return (
      <Paper sx={{ p: 2, mt: 1 }}>
        <Typography variant="h5">Skills</Typography>
        <List>
          {relatedLinks.map((link) => (
            <ListItem key={link.index}>
              <Link
                component="button"
                variant="body1"
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
  }
  if (!Array.isArray(relatedLinks))
    return (
      <Paper sx={{ p: 2, mt: 1 }}>
        <Typography variant="h5">Related Ability</Typography>
        <List>
          <ListItem>
            <Link
              component="button"
              variant="body1"
              underline="hover"
              onClick={() =>
                wikiDataHandler.onInItemLinkClick(relatedLinks.url)
              }
            >
              {relatedLinks.name}
            </Link>
          </ListItem>
        </List>
      </Paper>
    );
  return null;
};

export default RelatedLinks;
