import { Box, Typography } from "@mui/material";

export default function NoPage() {
  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "70%" },
        marginInline: "auto",
        marginTop: 15,
        minHeight: { xs: "80vh", md: "90vh" },
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">
        A página que você está procurando não existe.
      </Typography>
    </Box>
  );
}
