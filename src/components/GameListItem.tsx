import {
  Box,
  Card,
  Chip,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { handleNewImageUrl } from "../funcs/async/ImgFunctions";
import {
  CartItem,
  GameAverage,
  GameGenre,
  OriginalGame,
  WishlistItem,
} from "../types/types";
import { onRemoveFromWishlist } from "../funcs/async/WishlistFunctions";
import { onRemoveFromCart } from "../funcs/async/CartFunctions";

interface GameListItemProps {
  listType: "wishlist" | "cart" | "library";
  game: OriginalGame;
  games: OriginalGame[];
  setGames: React.Dispatch<React.SetStateAction<OriginalGame[]>>;
  gamesAverage: GameAverage[];
  gameGenres: GameGenre[];
  wishlistItems?: WishlistItem[];
  setWishlistItems?: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  cartItems?: CartItem[];
  setCartItems?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function GameListItem({
  listType,
  game,
  games,
  setGames,
  gamesAverage,
  gameGenres,
  wishlistItems,
  setWishlistItems,
  cartItems,
  setCartItems,
}: GameListItemProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleRemoveFromWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onRemoveFromWishlist({
      setWishlistItems: setWishlistItems,
      wishlistItems: wishlistItems,
      delWishlistItem: wishlistItems?.find(
        (wishlistItem) => wishlistItem.game_id === game.id
      ),
      setGames: setGames,
      games: games,
    });
  };

  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onRemoveFromCart({
      setCartItems: setCartItems,
      cartItems: cartItems,
      delCartItem: cartItems?.find((cartItem) => cartItem.game_id == game.id),
      setGames: setGames,
      games: games,
    });
  };

  let handleRemoveFromList: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  if (listType === "wishlist") {
    handleRemoveFromList = handleRemoveFromWishlist;
  } else if (listType === "cart") {
    handleRemoveFromList = handleRemoveFromCart;
  }

  const handleImgError = async (game: OriginalGame, fieldName: string) => {
    await handleNewImageUrl(game, fieldName, setGames);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Link
      to={`/game/${game.title}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Card
        sx={{
          position: "relative",
          display: "flex",
          gap: 3,
          padding: 2,
        }}
        elevation={2}
      >
        <Paper
          component={"img"}
          src={game.banner_image}
          onError={() => handleImgError(game, "banner_image")}
          loading="lazy"
          sx={{
            width: { xs: 172, sm: "60%" },
            aspectRatio: 16 / 9,
            borderRadius: 1,
            flexShrink: 0,
          }}
          elevation={4}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            width: "66%",
          }}
        >
          <Box>
            <Typography variant="h2">{game.title}</Typography>
            {gamesAverage?.map(
              (gameAverage) =>
                gameAverage.title === game.title && (
                  <Typography>
                    {gameAverage.avg.toPrecision(2) + " "}
                    <Rating
                      value={gameAverage.avg}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{
                        position: "relative",
                        top: 4,
                      }}
                    />{" "}
                    ({gameAverage.num_of_reviews})
                  </Typography>
                )
            )}
            {screenWidth >= 600 && (
              <Typography
                sx={{
                  marginBlock: 1,
                }}
              >
                {game.summary.length >= 190
                  ? game.summary.substring(0, 186) + "..."
                  : game.summary}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.6,
              marginTop: 1,
            }}
          >
            <Typography variant="h2" component={"p"} color={"primary"}>
              R${game.price.toFixed(2)}
            </Typography>
            {screenWidth >= 750 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                {gameGenres
                  ?.find(
                    ({ title, genres }) =>
                      game.title === title && genres.length > 0
                  )
                  ?.genres.map((genre, index) => (
                    <Chip
                      key={index}
                      label={genre.name}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
              </Box>
            )}
          </Box>
        </Box>
        {listType !== "library" && (
          <IconButton
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
            }}
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFromList(e);
            }}
          >
            {listType === "wishlist" && <FavoriteIcon />}
            {listType === "cart" && <RemoveShoppingCartIcon />}
          </IconButton>
        )}
      </Card>
    </Link>
  );
}
