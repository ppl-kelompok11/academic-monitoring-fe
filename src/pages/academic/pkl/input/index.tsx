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
  Select,
  NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import AppLayout from "@/layouts/AppLayout";
import { IoIosArrowBack } from "react-icons/io";
import next from "next";
import FileUpload from "@/components/molekul/FileUpload";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const form = useForm({
    initialValues: {
      status: "",
      grade: "",
      scan_pkl: {
        path: "",
        filename: "",
        ext: "",
        url: "",
      },
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await api.post("/pkl", {
        pkl_status: form.values.status,
        grade: form.values.grade,
        scan_pkl: form.values.scan_pkl.path,
      });

      if (response.status === 200) {
        router.push("/academic/pkl");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(form.values);
  };

  const handleUpload = (file: any) => {
    form.setFieldValue("scan_pkl", file);
    console.log(form.values);
  };

  return (
    <AppLayout activeLink="academic" role="mahasiswa">
      <div className={classes.wrapper}>
        <Stack mx={45}>
          <Group spacing={5}>
            <Box
              component={Link}
              href="/mahasiswa/dashboard"
              display="flex"
              style={{ textDecoration: "none" }}
            >
              <IoIosArrowBack size={32} />
            </Box>
            <Text c="black" size={32} fw={700} align="left">
              Input PKL
            </Text>
          </Group>
          <Box className={classes.form} py={15} px={20}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Select
                label="Status PKL"
                data={[
                  { value: "not_taken", label: "Belum Ambil" },
                  { value: "ongoing", label: "Sedang Ambil" },
                  { value: "lulus", label: "Sudah Lulus" },
                ]}
                {...form.getInputProps("status")}
              />
              <Space h={15} />
              <TextInput
                size="md"
                label="Nilai PKL"
                {...form.getInputProps("grade")}
              />
              <Space h={15} />
              <Text c="primary" size={18} fw={500} align="left" mb={5}>
                Scan Berita Acara PKL
              </Text>
              <FileUpload
                file={form.values.scan_pkl}
                onFileUpload={handleUpload}
              />
              <Group mt="md">
                <Button type="submit" onClick={handleSubmit}>
                  Simpan
                </Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </div>
    </AppLayout>
  );
}
