import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ThemeContext } from "../contexts/ThemeContext";
import { User } from "../types/types";

interface PartnerMobileMenuProps {
  mobileMoreAnchorEl: HTMLElement | null;
  setMobileMoreAnchorEl: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  user: User | null;
}

export default function PartnerMobileMenu({
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  user,
}: PartnerMobileMenuProps) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {darkMode ? (
        <MenuItem
          onClick={toggleTheme}
          sx={{
            display: "flex",
            gap: 1,
            paddingInline: 3,
          }}
        >
          <LightModeIcon />
          Modo Claro
        </MenuItem>
      ) : (
        <MenuItem
          onClick={toggleTheme}
          sx={{
            display: "flex",
            gap: 1,
            paddingInline: 3,
          }}
        >
          <DarkModeIcon />
          Modo Escuro
        </MenuItem>
      )}
      <MenuItem
        onClick={handleProfileMenuOpen}
        sx={{
          display: "flex",
          gap: 1,
          paddingInline: 3,
        }}
      >
        {user?.profile_picture ? (
          <Avatar
            src={user.profile_picture}
            slotProps={{ img: { loading: "lazy" } }}
            sx={{
              width: 24,
              height: 24,
            }}
          />
        ) : (
          <AccountCircle />
        )}
        Perfil
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </>
  );
}
