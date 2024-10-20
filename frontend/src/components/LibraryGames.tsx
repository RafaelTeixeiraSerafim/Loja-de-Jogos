import { useContext, useEffect, useState } from "react";
import { GameAverage, GameGenre, OriginalGame } from "../types/types";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../contexts/UserContext";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import GameListItem from "./GameListItem";

export default function LibraryGames() {
  const [games, setGames] = useState<OriginalGame[]>([]);
  const [gamesAverage, setGamesAverage] = useState<GameAverage[]>([]);
  const [gameGenres, setGameGenres] = useState<GameGenre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const getGames = () => {
    if (!user?.id) return;

    const config = {
      headers: {
        Authorization: "Bearer " + (localStorage.getItem("token") || ""),
      },
    };

    axiosInstance
      .get(`/api/bought_games?user_id=${user.id}`, config)
      .then((response) => {
        console.log(response);
        setGames(response.data.games);
        setGameGenres(response.data.game_genres);
        setGamesAverage(response.data.avgs);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return;
        } else {
          console.error(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(getGames, [user?.id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {games.map((game) => (
        <GameListItem
          listType="library"
          game={game}
          games={games}
          setGames={setGames}
          gameGenres={gameGenres}
          gamesAverage={gamesAverage}
          key={game.id}
        />
      ))}
      {games.length === 0 && !isLoading && (
        <Typography sx={{ fontWeight: "bold" }}>
          Parece que você ainda não comprou nenhum jogo...
        </Typography>
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
