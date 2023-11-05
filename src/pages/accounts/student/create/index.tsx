import React from "react";
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
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import AppLayout from "@/layouts/AppLayout";
import { IoIosArrowBack } from "react-icons/io";
import next from "next";

const UseStyles = createStyles((theme) => ({
  wrapper: {},
  form: {
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  title: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "60px",
    },
  },
  addMahasiswaFormLayout: {
    [theme.fn.smallerThan("md")]: {
      width: "300px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Index() {
  const { classes } = UseStyles();
  const form = useForm({
    initialValues: {
      nim: "",
      nama: "",
      angkatan: "",
      status: "",
    },
  });

  return (
    <AppLayout activeLink="accounts" role="operator">
      <div className={classes.wrapper}>
        <Stack mx={45}>
          <Group spacing={5}>
            <Box
              component={Link}
              href="/operator/dashboard"
              display="flex"
              style={{ textDecoration: "none" }}
            >
              <IoIosArrowBack size={32} />
            </Box>
            <Text c="black" size={32} fw={700} align="left">
              Tambah Akun Mahasiswa
            </Text>
            </Group>
          <Box className={classes.form} py={15} px={20}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                size="md"
                label="Email"
                {...form.getInputProps("email")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Nama Lengkap"
                {...form.getInputProps("nama")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Angkatan"
                {...form.getInputProps("angkatan")}
              />
              <Space h={15} />
              <Select
                label="Status"
                data={[
                  { value: 'aktif', label: 'Aktif' },
                  { value: 'lulus', label: 'lulus' },
                  { value: 'cuti', label: 'Cuti' },
                  { value: 'mangkir', label: 'Mangkir' },
                  { value: 'dropout', label: 'Dropout' },
                ]}
                {...form.getInputProps("status")}
              />
              <Select
                label="Status"
                data={[
                  { value: 'aktif', label: 'Aktif' },
                  { value: 'lulus', label: 'lulus' },
                  { value: 'cuti', label: 'Cuti' },
                  { value: 'mangkir', label: 'Mangkir' },
                  { value: 'dropout', label: 'Dropout' },
                ]}
                {...form.getInputProps("status")}
              />

              <Group mt="md">
                <Button type="submit">Tambah</Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </div>
    </AppLayout>
  );
}
