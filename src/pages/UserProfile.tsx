import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { OriginalGame, User } from "../types/types";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import DefaultPFP from "../../Assets/images/DefaultPFP.jpg";
import {
  Box,
  Paper,
  Typography,
  Card,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { handleNewImageUrl } from "../funcs/async/ImgFunctions";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState<User>();
  const [games, setGames] = useState<OriginalGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const { username } = useParams();
  const { state } = useLocation();

  const isActiveUserProfile = user?.id === profileUser?.id;

  const getUserWithUsername = () => {
    if (!username) return;

    axiosInstance
      .get(`/api/users?username=${username}`)
      .then((response) => {
        console.log(response);
        setProfileUser(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const fetchProfileUserBoughtGames = () => {
    if (!profileUser) return;

    axiosInstance
      .get(`/api/bought_games?user_id=${profileUser.id}`)
      .then((response) => {
        console.log(response);
        setGames(response.data.games);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return;
        } else {
          console.error(error);
        }
      });
  };

  const handleImgError = async (game: OriginalGame, fieldName: string) => {
    await handleNewImageUrl(game, fieldName, setGames);
  };

  useEffect(getUserWithUsername, []);
  useEffect(fetchProfileUserBoughtGames, [isLoading]);
  useEffect(() => {
    if (state?.alert) {
      setShowAlert(true);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", md: "70%" },
        marginInline: "auto",
        minHeight: { xs: "85vh", md: "95vh" },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: "0.5rem",
          marginBlock: "6rem",
          padding: 2,
          width: "100%",
        }}
      >
        {!profileUser ? (
          <Typography fontWeight={"bold"}>
            Não achamos este usuário...
          </Typography>
        ) : (
          <>
            <Paper
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                alignItems: "center",
                gap: 2,
                padding: 2,
              }}
            >
              <Box
                component={"img"}
                sx={{
                  width: 160,
                  aspectRatio: 1,
                  borderRadius: "50rem",
                }}
                src={
                  profileUser.profile_picture
                    ? profileUser.profile_picture
                    : DefaultPFP
                }
                loading="lazy"
                alt=""
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: { xs: "flex-start", sm: "inherit" },
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h1" component={"p"}>
                    {profileUser.username}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginTop: 0.1,
                    wordWrap: "break-word",
                  }}
                >
                  {profileUser.email_address}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "1.5rem",
                    marginBottom: 1,
                    maxWidth: "30rem",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                  variant="subtitle2"
                >
                  {profileUser.summary}
                </Typography>
              </Box>
              {isActiveUserProfile && (
                <IconButton
                  size="large"
                  aria-label="settings"
                  color="secondary"
                  href="/settings/profile"
                  sx={{
                    position: "absolute",
                    height: 20,
                    width: 20,
                    top: 10,
                    right: 10,
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              )}
            </Paper>
            <Typography variant="subtitle1" sx={{ marginTop: "1rem" }}>
              Jogos comprados:
            </Typography>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                overflow: "scroll",
                gap: 2,
                padding: 2,
              }}
            >
              {games?.map((game) => (
                <Link
                  key={game.id}
                  to={`/game/${game.title}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Card
                    key={game.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "secondary.main",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={game.banner_image}
                      onError={() => handleImgError(game, "banner_image")}
                      loading="lazy"
                      alt=""
                      style={{ width: "10rem", aspectRatio: "16/9" }}
                    />
                    <Box
                      sx={{
                        backgroundColor: "secondary.dark",
                        textAlign: "center",
                        marginBlock: 1,
                      }}
                    >
                      <Typography color={"common.white"} variant="subtitle2">
                        {game.title}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              ))}
            </Paper>
          </>
        )}
      </Paper>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => {
            setShowAlert(false);
            window.history.replaceState({}, "");
          }}
          sx={{
            position: "fixed",
            bottom: "3vh",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          {state.alert}
        </Alert>
      )}
    </Box>
  );
}
