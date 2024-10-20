import LibraryGames from "../components/LibraryGames";
import { Box, Typography } from "@mui/material";

export default function GameLibrary() {
  return (
    <Box
      sx={{
        marginBlock: 5,
        marginTop: 15,
        width: { xs: "90%", md: "70%" },
        marginInline: "auto",
        minHeight: { xs: "80vh", md: "90vh" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginBottom: 1,
        }}
      >
        Biblioteca
      </Typography>
      <LibraryGames />
    </Box>
  );
}
