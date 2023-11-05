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
  Image,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import TitleWithBack from "@/components/atoms/TitleWithBack";

const useStyles = createStyles((theme) => ({
  name: {
    textUnderlineOffset: "15px",
  },
  card: {
    borderRadius: "14px",
  },
  form: {
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  gridCol: {
    maxWidth: "455px",
    marginRight: "20px",
  },
}));

export default function Index() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      nama: "",
      email: "",
      provinsi: "",
      kabupatenKota: "",
      handphone: "",
    },
  });

  return (
    <AppLayout activeLink="profile" role="mahasiswa">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Profile" route="/dashboard/operator" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Group sx={{width: "100%" }} position="apart">
            <Box className={classes.form} py={20} px={30}>
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
                  label="NIM"
                  {...form.getInputProps("nim")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="alamat"
                  {...form.getInputProps("alamat")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="Kabupaten / Kota"
                  {...form.getInputProps("kabupatenKota")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="Provinsi"
                  {...form.getInputProps("provinsi")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="Angkatan"
                  {...form.getInputProps("angkatan")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="Jalur Masuk"
                  {...form.getInputProps("jalurMasuk")}
                />
                <Space h={15} />
                <TextInput
                  size="md"
                  label="Handphone"
                  {...form.getInputProps("handphone")}
                />
                <Space h={15} />
                <NativeSelect
                  label="Status"
                  data={["Aktif", "Cuti", "Mangkir", "Drop Out", "Lulus"]}
                  {...form.getInputProps("status")}
                />
                <Group mt="md">
                  <Button type="submit">Simpan</Button>
                </Group>
              </form>
            </Box>

            <Image
              alt="profile"
              src="/profile-sample.png"
              height={400}
              width={400}
            />
          </Group>
        </Card>
      </Stack>
    </AppLayout>
  );
}
