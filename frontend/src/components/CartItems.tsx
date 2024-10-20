import { CartItem, GameAverage, GameGenre, OriginalGame } from "../types/types";
import { Box } from "@mui/material";
import React from "react";
import GameListItem from "./GameListItem";

interface CartItemsProps {
  setCartItems: (items: React.SetStateAction<CartItem[]>) => void;
  cartItems: CartItem[];
  setGames: (games: React.SetStateAction<OriginalGame[]>) => void;
  games: OriginalGame[];
  gameGenres: GameGenre[];
  gamesAverage: GameAverage[];
}

export default function CartItems({
  setCartItems,
  cartItems,
  setGames,
  games,
  gameGenres,
  gamesAverage,
}: CartItemsProps) {
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
          listType="cart"
          game={game}
          games={games}
          setGames={setGames}
          gamesAverage={gamesAverage}
          gameGenres={gameGenres}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </Box>
  );
}
