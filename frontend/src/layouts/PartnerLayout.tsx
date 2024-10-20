import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UserContext from "../contexts/UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HeaderLogo from "../components/HeaderLogo";
import { ThemeContext } from "../contexts/ThemeContext";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../utils/axiosInstance";
import { OriginalGame } from "../types/types";
import PartnerMobileMenu from "../components/PartnerMobileMenu";
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
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  function fetchPartnerGames() {
    if (!user?.id) return;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .get(`/api/games?creator_id=${user.id}`, config)
      .then((response) => {
        setGames(response.data.gameList);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/partner/login", { relative: "route" });
        }
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
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/partner/${user?.username}`);
        }}
        key={"btnProfile"}
      >
        Minha Conta
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/`);
        }}
        key={"btnToUser"}
      >
        Troca para Usuário
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/settings/profile`);
        }}
        key={"btnConfig"}
      >
        Configurações
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logoutUser();
          navigate(`/`);
        }}
        key={"btnLogout"}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  useEffect(fetchPartnerGames, []);

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
              padding: { md: 0 },
              paddingBlock: { xs: 0.5, sm: 0 },
            }}
          >
            <Link to={"/"}>
              <HeaderLogo />
            </Link>
            <SearchBar games={games} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                href="/partner/new-game"
              >
                <AddIcon />
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
            <PartnerMobileMenu
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
