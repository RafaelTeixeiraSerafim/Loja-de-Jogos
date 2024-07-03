import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link, Outlet } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "../contexts/ThemeContext";
import LogoLong from "../assets/images/Logo_Long.png";

export default function ErrorLayout() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: { xs: "flex" },
              justifyContent: "space-between",
              width: { xs: "95%", sm: "70%" },
              margin: "auto",
              paddingInline: { sm: 0 },
            }}
          >
            <Link to={"/"}>
              <Box
                component="img"
                sx={{
                  maxWidth: 250,
                  filter: "drop-shadow(0px 0px 2px #222)",
                }}
                alt="logo"
                loading="lazy"
                src={LogoLong}
              />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={toggleTheme}
            >
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
