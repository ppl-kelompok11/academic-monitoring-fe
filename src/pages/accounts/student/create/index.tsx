import React from "react";
import {
  Stack,
  Text,
  createStyles,
  Box,
  TextInput,
  PasswordInput,
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
import api from "@/configs/axios-interceptors";
import Router from "next/router";
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
      email: "",
      nama: "",
      angkatan: "",
      status: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    // console.log(form.errors);
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.post("/students", {
          email: form.values.email,
          password: form.values.password,
          name: form.values.nama,
          nim: form.values.nim,
          start_education_year: form.values.angkatan,
          status: form.values.status,
        });
        console.log(response);
        form.reset();
        Router.push("/accounts/student");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                label="nim"
                {...form.getInputProps("nim")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Angkatan"
                {...form.getInputProps("angkatan")}
              />
              <Space h={15} />
              {/* <Select
                label="Status"
                data={[
                  { value: 'aktif', label: 'Aktif' },
                  { value: 'lulus', label: 'lulus' },
                  { value: 'cuti', label: 'Cuti' },
                  { value: 'mangkir', label: 'Mangkir' },
                  { value: 'dropout', label: 'Dropout' },
                ]}
                {...form.getInputProps("status")}
              /> */}
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
              <Space h={15} />
              <PasswordInput
                size="md"
                label="Password"
                {...form.getInputProps("password")}
              />

              <Group mt="md">
                <Button type="submit" onClick={handleSubmit}>Tambah</Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </div>
    </AppLayout>
  );
}
