import React from "react";
import { Stack, Box, Text } from "@mantine/core";
import { type } from "os";
interface TimelineCardProps {
  icon: React.ReactNode;
  title?: string;
  date?: string;
  type: string | "line" | "card";
}

export default function Index({ icon, title, date, type }: TimelineCardProps) {
  return (
    <Stack
      sx={{
        width: type === "line" ? "91px" : "200px",
        height: "220px",
        // backgroundColor: "white",
      }}
      align="center"
      justify="center"
    >
      <Box
        sx={{
          border: type === "card" ? "8px solid #6879C0" : "none",
          borderRadius: "40px",
          width: type === "line" ? "91px" : "120px",
          height: "120px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ height: "60px" }}>
        <Text size={15} color="white" align="center">
          {title}
          <br />
          {date}
        </Text>
      </Box>
    </Stack>
  );
}
