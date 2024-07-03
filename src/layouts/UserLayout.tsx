import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import UserContext from "../contexts/UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "../contexts/ThemeContext";
import HeaderLogo from "../components/HeaderLogo";
import { OriginalGame } from "../types/types";
import axiosInstance from "../utils/axiosInstance";
import UserMobileMenu from "../components/UserMobileMenu";
import SearchBar from "../components/SearchBar";

export default function UserLayout() {
  const [games, setGames] = useState<OriginalGame[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const { user, logoutUser } = useContext(UserContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  function fetchGames() {
    axiosInstance
      .get("/api/games")
      .then((response) => {
        console.log(response);
        setGames(response.data.gameList);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?.username
        ? [
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/user/${user?.username}`);
              }}
              key={"btnProfile"}
            >
              Minha Conta
            </MenuItem>,
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/partner`);
              }}
              key={"btnPartner"}
            >
              Trocar para Parceiro
            </MenuItem>,
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/settings/profile`);
              }}
              key={"btnConfig"}
            >
              Configurações
            </MenuItem>,
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logoutUser();
                navigate(`/`);
              }}
              key={"btnLogout"}
            >
              Logout
            </MenuItem>,
          ]
        : [
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/login`);
              }}
              key={"btnUserLogin"}
            >
              Login
            </MenuItem>,
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/signup`);
              }}
              key={"btnSignup"}
            >
              Signup
            </MenuItem>,
          ]}
    </Menu>
  );

  useEffect(fetchGames, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: { xs: "flex" },
              justifyContent: "space-between",
              width: { xs: "95%", md: "70%" },
              margin: "auto",
              paddingInline: { md: 0 },
              paddingBlock: { xs: 0.5, sm: 0 },
            }}
          >
            <Link to={"/"}>
              <HeaderLogo />
            </Link>
            <SearchBar games={games} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
              <IconButton
                size="large"
                aria-label="wishlist"
                color="inherit"
                href={"/wishlist"}
              >
                {/* Ícone de notificação */}
                {/* <Badge badgeContent={4} color="error">
                </Badge> */}
                <FavoriteIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="carrinho"
                color="inherit"
                href={"/cart"}
              >
                {/* Ícone de notificação */}
                {/* <Badge badgeContent={17} color="error">
                </Badge> */}
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="library"
                color="inherit"
                href={"/library"}
              >
                {/* Ícone de notificação */}
                {/* <Badge badgeContent={17} color="error">
                </Badge> */}
                <FolderIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={toggleTheme}
              >
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {user?.profile_picture ? (
                  <Avatar
                    src={user.profile_picture}
                    slotProps={{ img: { loading: "lazy" } }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Box>

            {/* Mobile Menu */}
            <UserMobileMenu
              handleMobileMenuClose={handleMobileMenuClose}
              handleProfileMenuOpen={handleProfileMenuOpen}
              mobileMoreAnchorEl={mobileMoreAnchorEl}
              setMobileMoreAnchorEl={setMobileMoreAnchorEl}
              user={user}
            />
            {renderMenu}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
