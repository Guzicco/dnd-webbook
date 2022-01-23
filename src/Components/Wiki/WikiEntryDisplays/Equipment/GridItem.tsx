import { Box, Link, Typography } from "@mui/material";
import { useWikiDataHandler } from "../../WikiContext";

interface IProps {
  header: string;
  content: string;
  url?: string;
}

const GridItem: React.FC<IProps> = ({ header, content, url }) => {
  const wikiDataHandler = useWikiDataHandler();
  return (
    <>
      <Box>
        <Typography variant="h6">{header}</Typography>
      </Box>
      <Box>
        {url ? (
          <Link
            component="button"
            variant="body1"
            onClick={() => wikiDataHandler.onInItemLinkClick(url)}
          >
            {content}
          </Link>
        ) : (
          <Typography variant="body1">{content}</Typography>
        )}
      </Box>
    </>
  );
};

export default GridItem;
