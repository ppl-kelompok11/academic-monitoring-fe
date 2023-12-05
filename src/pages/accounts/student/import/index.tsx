import React, { useState } from "react";
import {
  Stack,
  createStyles,
  Box,
  Group,
  Button,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Router from "next/router";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import FileUpload from "@/components/molekul/FileUpload";

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
  const thisYear = new Date().getFullYear();

  const form = useForm({
    initialValues: {
      nim: "",
      nama: "",
      angkatan: thisYear.toString(),
      status: "00",
      lecture_id: "",
      entrance_code: "",
      file_mahasiswa: ""
    },
  });

  // const handleSubmit = async () => {
  //   // console.log(form.errors);
  //   form.validate();
  //   if (!form.validate().hasErrors) {
  //     try {
  //       const response = await api.post("/students", {
  //         name: form.values.nama,
  //         nim: form.values.nim,
  //         start_education_year: parseInt(form.values.angkatan),
  //         status: form.values.status,
  //         entrance_code: form.values.entrance_code,
  //         lecture_id: form.values.lecture_id,
  //       });
  //       console.log(response);
  //       form.reset();
  //       Router.push("/accounts/student");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleSubmit = () => {
    Router.push("/accounts/student");
  }

  const handleUpload = (file: any) => {
    form.setFieldValue("file_mahasiswa", file);
    console.log(form.values);
};

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
              <Text c="black" size={16} fw={400} align="left">Upload File Excel / CSV</Text>
              <FileUpload
                file={form.values.file_mahasiswa}
                onFileUpload={handleUpload}
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
