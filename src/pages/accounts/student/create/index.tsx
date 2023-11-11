import React, { useState } from "react";
import {
  Stack,
  createStyles,
  Box,
  TextInput,
  Group,
  Button,
  Space,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { YearPickerInput } from "@mantine/dates";
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Router from "next/router";
import TitleWithBack from "@/components/atoms/TitleWithBack";

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
  const [dosenWali, setDosenWali] = useState([]);

  const form = useForm({
    initialValues: {
      nim: "",
      email: "",
      nama: "",
      angkatan: new Date(),
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

  const getDosenWali = async () => {
    try {
      const response = await api.get("/lecture");
      setDosenWali(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDosenWali();
  }, []);

  const doswalData = dosenWali.map((doswal: any) => ({
    value: doswal.id,
    label: doswal.name + " - " + doswal.nip,
  }));

  return (
    <AppLayout activeLink="accounts" role="operator">
      <div className={classes.wrapper}>
        <Stack mx={45}>
          <TitleWithBack
            title="Tambah Akun Mahasiswa"
            route="/accounts/student/"
          />
          <Box className={classes.form} py={15} px={20}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                size="md"
                label="Nama Lengkap"
                {...form.getInputProps("nama")}
              />
              <Space h={15} />
              <TextInput size="md" label="NIM" {...form.getInputProps("nim")} />
              <Space h={15} />
              <YearPickerInput
                label="Angkatan"
                placeholder="Pilih Tahun Masuk"
                {...form.getInputProps("angkatan")}
              />
              <Space h={15} />
              <Select
                label="Dosen Wali"
                data={doswalData}
                {...form.getInputProps("status")}
              />
              <Group mt="md">
                <Button type="submit" onClick={handleSubmit}>
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
