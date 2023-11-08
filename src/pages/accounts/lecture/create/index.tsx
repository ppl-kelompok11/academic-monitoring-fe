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
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Link from "next/link";
import AppLayout from "@/layouts/AppLayout";
import { IoIosArrowBack } from "react-icons/io";
import next from "next";
import moment from "moment";
import api from "@/configs/axios-interceptors";
import Router from "next/router";

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
      nama: "",
      email: "",
      nip: "",
      nidn: "",
      workStartDate: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    // console.log(form.errors);
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.post("/lecture", {
          email: form.values.email,
          password: form.values.password,
          name: form.values.nama,
          nip: form.values.nip,
          nidn: form.values.nidn,
        });
        console.log(response);
        form.reset();
        Router.push("/accounts/lecture");
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
              Tambah Akun Dosen
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
              <TextInput size="md" label="NIP" {...form.getInputProps("nip")} />
              <Space h={15} />
              <TextInput
                size="md"
                label="NIDN"
                {...form.getInputProps("nidn")}
              />
              <Space h={15} />
              <PasswordInput
                size="md"
                label="Password"
                {...form.getInputProps("password")}
              />
              {/* <DateInput
                dateParser={(input) => {
                  const date = moment(input, "DD/MM/YYYY").toDate();
                  return date;
                }}
                valueFormat="DD/MM/YYYY"
                label="Tanggal Mulai Bekerja"
                {...form.getInputProps("workStartDate")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Tanggal Mulai Bekerja"
                {...form.getInputProps("workStartDate")}
              /> */}
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
