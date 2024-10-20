import { useState, useEffect } from "react";
import {
  GameAverage,
  GameGenre,
  OriginalGame,
  WishlistItem,
} from "../types/types";
import { getWishlistItems } from "../funcs/async/WishlistFunctions";
import { Box, Typography } from "@mui/material";
import GameListItem from "./GameListItem";

export default function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [games, setGames] = useState<OriginalGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gamesAverage, setGamesAverage] = useState<GameAverage[]>([]);
  const [gameGenres, setGameGenres] = useState<GameGenre[]>([]);

  useEffect(
    () =>
      getWishlistItems(
        setWishlistItems,
        setGames,
        setIsLoading,
        setGamesAverage,
        setGameGenres
      ),
    []
  );

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
          listType="wishlist"
          game={game}
          games={games}
          setGames={setGames}
          gameGenres={gameGenres}
          gamesAverage={gamesAverage}
          setWishlistItems={setWishlistItems}
          wishlistItems={wishlistItems}
        />
      ))}
      {wishlistItems.length === 0 && !isLoading && (
        <Typography sx={{ fontWeight: "bold" }}>
          Parece que você não tem nenhum item na sua wishlist...
        </Typography>
      )}
    </Box>
  );
}
