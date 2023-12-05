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
  const [isLoading, setIsLoading] = useState(false);
  const thisYear = new Date().getFullYear();

  const form = useForm({
    initialValues: {
      nim: "",
      nama: "",
      angkatan: thisYear.toString(),
      status: "00",
      lecture_id: "",
      entrance_code: "",
    },
  });

  const handleSubmit = async () => {
    // console.log(form.errors);
    form.validate();
    if (!form.validate().hasErrors) {
      setIsLoading(true);
      try {
        const response = await api.post("/students", {
          name: form.values.nama,
          nim: form.values.nim,
          start_education_year: parseInt(form.values.angkatan),
          status: form.values.status,
          entrance_code: form.values.entrance_code,
          lecture_id: form.values.lecture_id,
        });
        console.log(response);
        form.reset();
        Router.push("/accounts/student");
        setIsLoading(false);
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

  const entrancesData = [
    { value: "00", label: "SNMPTN" },
    { value: "01", label: "SBMPTN" },
    { value: "02", label: "Mandiri" },
  ];

  const angkatanData = [];
  for (let i = thisYear - 2; i <= thisYear + 2; i++) {
    angkatanData.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

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
                disabled={isLoading}
                {...form.getInputProps("nama")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="NIM"
                disabled={isLoading}
                {...form.getInputProps("nim")}
              />
              <Space h={15} />
              <Select
                label="Angkatan"
                data={angkatanData}
                disabled={isLoading}
                {...form.getInputProps("angkatan")}
              />
              <Space h={15} />
              <Select
                label="Jalur Masuk"
                data={entrancesData}
                disabled={isLoading}
                {...form.getInputProps("entrance_code")}
              />
              <Space h={15} />
              <Select
                label="Dosen Wali"
                data={doswalData}
                disabled={isLoading}
                {...form.getInputProps("lecture_id")}
              />
              <Group mt="md">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loading={isLoading}
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
