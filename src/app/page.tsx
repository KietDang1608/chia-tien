'use client';
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
    }}
    >
      {/* label title */}
      <Box>
        <Typography variant="h4" component="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
        }}
        >
          Chia tiền đi chơi
        </Typography>
      </Box>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
      >
        <Button onClick={() => window.location.href = "/event"}
        sx={{
          backgroundColor: "#00ADB5",
          color: "#EEEEEE",
          "&:hover": {
            
            opacity: 0.8,
          },
        }}
        >
          Tạo sự kiện
        </Button>
        <Button onClick={() => window.location.href = "/member"}
        sx={{
          backgroundColor: "#393E46",
          color: "#EEEEEE",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        >
          Các thành viên
        </Button>
      </Box>
    </Box>
  );
}
