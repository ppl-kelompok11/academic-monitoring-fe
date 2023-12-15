import React, { useState } from "react";
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
import { DateInput } from "@mantine/dates";
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
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      nama: "",
      email: "",
      nip: "",
      nidn: "",
      work_start_date: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        setIsLoading(true);
        const response = await api.post("/lecture", {
          email: form.values.email,
          password: form.values.password,
          name: form.values.nama,
          nip: form.values.nip,
          nidn: form.values.nidn,
          work_start_date: moment(form.values.work_start_date).format("YYYY-MM-DD"),
        });
        console.log(response);
        if (response.status === 201) {
          Router.push("/accounts/lecture");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <AppLayout activeLink="accounts" role="operator">
      <div className={classes.wrapper}>
        <Stack mx={45}>
          <TitleWithBack title="Tambah Akun Dosen" route="/accounts/lecture/" />
          <Box className={classes.form} py={15} px={20}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                size="md"
                label="Email"
                disabled={isLoading}
                {...form.getInputProps("email")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Nama Lengkap"
                disabled={isLoading}
                {...form.getInputProps("nama")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="NIP"
                disabled={isLoading}
                {...form.getInputProps("nip")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="NIDN"
                disabled={isLoading}
                {...form.getInputProps("nidn")}
              />
              <Space h={15} />
              <PasswordInput
                size="md"
                label="Password"
                disabled={isLoading}
                {...form.getInputProps("password")}
              />
              <Space h={15} />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Tanggal Mulai Bekerja"
                disabled={isLoading}
                {...form.getInputProps("work_start_date")}
              />
              <Group mt="md">
                <Button
                  loading={isLoading}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Tambah
                </Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </div>
    </AppLayout>
  );
}
