import React from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  Stack,
  Text,
  createStyles,
  Box,
  TextInput,
  Group,
  Button,
  Space,
  NativeSelect,
  Card,
  SimpleGrid,
  Center,
  Grid,
  Flex,
} from "@mantine/core";

import { AiOutlinePlus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { PiPlusBold } from "react-icons/pi";
import Link from "next/link";
import NavButton from "@/components/atoms/NavButton";

import SimpleCard from "@/components/atoms/SimpleCard";

const useStyles = createStyles((theme) => ({
  name: {
    textUnderlineOffset: "15px",
  },
  card: {
    borderRadius: "14px",
  },
  gridCol: {
    maxWidth: "455px",
    marginRight: "20px",
  },
  addBtn: {
    borderRadius: "13px",
    backgroundColor: "#333F73",
    color: "white",
    fontWeight: 600,
    fontSize: "32px",
    padding: "5px",
    ":hover": {
      backgroundColor: "#333F73",
      borderRadius: "8px",
    },
  },
}));

export default function Index() {
  const { classes } = useStyles();

  return (
    <AppLayout activeLink="dashboard" role="mahasiswa">
      <Stack pt="3vh" px="3%">
        <Text
          size={32}
          fw={600}
          align="left"
          underline
          className={classes.name}
        >
          Halo Husain!
        </Text>
        <Space h={20} />
        <Flex align="flex-start" wrap="wrap" gap={10}>
          <SimpleCard title="Jumlah Mahasiswa" value={"12"} />
          <SimpleCard title="Jumlah Mahasiswa" value={"12"} />
          <SimpleCard title="Jumlah Mahasiswa" value={"12"} />
          <SimpleCard title="Jumlah Mahasiswa" value={"12"} />
        </Flex>
      </Stack>
    </AppLayout>
  );
}
