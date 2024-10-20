import React from "react";
import { Box, Typography } from "@mui/material";
const WishlistItems = React.lazy(() => import("../components/WishlistItems"));

export default function Wishlist() {
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
        Wishlist
      </Typography>
      <WishlistItems />
    </Box>
  );
}
