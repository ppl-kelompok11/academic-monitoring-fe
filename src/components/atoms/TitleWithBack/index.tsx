import React from "react";
import { Box, Group, Text } from "@mantine/core";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

type TitleWithBackProps = {
  title: string;
  route: string;
};

export default function index({ title, route }: TitleWithBackProps) {
  return (
    <Group spacing={5}>
      <Box
        component={Link}
        href={route}
        display="flex"
        style={{ textDecoration: "none" }}
      >
        <IoIosArrowBack size={32} />
      </Box>
      <Text c="black" size={32} fw={700} align="left">
        {title}
      </Text>
    </Group>
  );
}
