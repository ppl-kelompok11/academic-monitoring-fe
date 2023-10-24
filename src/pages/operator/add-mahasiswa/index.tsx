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
} from "@mantine/core";
import { useForm } from "@mantine/form";

const UseStyles = createStyles((theme) => ({
  wrapper: {
    background: "#FFFFFF",
  },
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
    <div>
      <Stack sx={{ height: "100vh" }} mt={35} mx={45}>
        <Text c="black" size={32} fw={600} align="left">
          Tambah Akun Mahasiswa
        </Text>
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
            <NativeSelect
              label="Status"
              data={["Aktif", "Cuti", "Mangkir", "Drop Out", "Lulus"]}
              {...form.getInputProps("status")}
            />  
            <Group mt="md">
              <Button type="submit">Tambah</Button>
            </Group>
          </form>
        </Box>
      </Stack>
      test
    </div>
  );
}
