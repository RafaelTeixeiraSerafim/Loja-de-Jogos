import { Box } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/imageCarousel.css";
import GameForm from "../components/GameForm";
import { emptyOriginalGame } from "../utils/defaultValues";

export default function CreateGame() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "90%", md: "70%" },
        marginInline: "auto",
        marginBlock: 5,
        marginTop: 12,
        minHeight: "90vh",
      }}
    >
      <GameForm existingGame={emptyOriginalGame} />
    </Box>
  );
}
