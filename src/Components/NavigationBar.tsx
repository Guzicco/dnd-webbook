import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  ContainerProps,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IRouteName, ILink } from "../App";
import styles from "../App.module.css";
import logo from "../Static/img/DDLogo.jpg";

interface Props extends ContainerProps {
  routes: { [key in IRouteName]: ILink };
}

const NavigationBar: React.FC<Props> = ({ routes, sx: displayProps }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={displayProps} component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            variant="square"
            src={logo}
            alt="D&D"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            D&D
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.entries(routes).map(([key, route]) => (
                <MenuItem
                  key={route.name}
                  onClick={handleCloseNavMenu}
                  sx={{ width: "80vw" }}
                >
                  <Typography textAlign="center">{route.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            D&D
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.entries(routes).map(([key, route]) => (
              <Button
                key={route.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography color="primary">
                  <RouterLink to={`/${route.url}`} className={styles.textLink}>
                    {route.name}
                  </RouterLink>
                </Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
