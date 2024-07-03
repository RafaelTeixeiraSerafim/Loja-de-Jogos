import { useContext, useEffect, useState } from "react";
import { OriginalGame } from "../types/types.tsx";
import PartnerHomeGames from "../components/PartnerHomeGames.tsx";
import axiosInstance from "../utils/axiosInstance.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext.tsx";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function PartnerHome() {
  const [games, setGames] = useState<OriginalGame[]>([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const isLoggedIn = Boolean(user?.id);

  function fetchPartnerGames() {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .get(`/api/games?creator_id=${user?.id}`, config)
      .then((response) => {
        setGames(response.data.gameList);
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/partner/login", { relative: "route" });
        }
      });
  }

  useEffect(fetchPartnerGames, [isLoggedIn]);
  useEffect(() => {
    if (state?.alert) {
      setShowAlert(true);
    }
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "90%", md: "70%" },
        marginInline: "auto",
        marginBlock: 5,
        marginTop: 15,
        minHeight: { xs: "80vh", md: "90vh" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginBottom: 2,
        }}
      >
        Meus Jogos
      </Typography>
      {games.length === 0 ? (
        <>
          {!isLoading && (
            <Typography sx={{ fontWeight: "bold" }}>
              Parece que você ainda não criou nenhum jogo...
            </Typography>
          )}
        </>
      ) : (
        <PartnerHomeGames
          games={games}
          setGames={setGames}
        />
      )}
      <Button
        href="/partner/new-game"
        variant="contained"
        size="large"
        sx={{
          paddingInline: 2,
          marginBlock: 5,
        }}
      >
        Novo Jogo
      </Button>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
