import React from "react";
import {
  Stack,
  createStyles,
  Box,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from '@mantine/dates';
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Router from "next/router";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import moment from "moment";

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
          workStartDate: moment(form.values.workStartDate).format("YYYY-MM-DD"),
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
        <TitleWithBack
            title="Tambah Akun Dosen"
            route="/accounts/lecture/"
          />
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
              <Space h={15} />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Tanggal Mulai Bekerja"
                {...form.getInputProps("workStartDate")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Tanggal Mulai Bekerja"
                {...form.getInputProps("workStartDate")}
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
