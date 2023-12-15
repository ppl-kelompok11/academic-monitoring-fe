import React, { useState } from "react";
import {
  Stack,
  Text,
  createStyles,
  Box,
  TextInput,
  Textarea,
  Group,
  Button,
  Space,
  ScrollArea,
  PasswordInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import AppLayout from "@/layouts/AppLayout";
import Cookies from "js-cookie";

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
  bioMahasiswaFormLayout: {
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
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const form = useForm({
    initialValues: {
      name: "",
      nim: "",
      email: "",
      password: "",
      dosen_wali_id: "",
      gender: "",
      province_id: "",
      city_id: "",
      address: "",
      photo: "",
      phone: "",
      start_education_year: "",
      entrance_code: "",
    },
  });

  const getProfile = async () => {
    try {
      const response = await api.get("/students/" + user.ref_id);
      form.setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinces = async () => {
    try {
      const response = await api.get("/provinces/lookup");
      setProvinces(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await api.get(
        "/cities/lookup?province_id=" + form.values.province_id
      );
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProfile();
    getProvinces();
  }, []);

  React.useEffect(() => {
    getCities();
  }, [form.values.province_id]);

  const entrancesData = [
    { value: "00", label: "SNMPTN" },
    { value: "01", label: "SBMPTN" },
    { value: "02", label: "Mandiri" },
  ];

  const provincesData = provinces.map((data: any) => ({
    value: data.id,
    label: data.province_name,
  }));

  const citiesData = cities.map((data: any) => ({
    value: data.id,
    label: data.city_name,
  }));

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await api.put("/students", {
        name: form.values.name,
        nim: form.values.nim,
        email: form.values.email,
        password: form.values.password,
        gender: form.values.gender,
        province_id: form.values.province_id,
        city_id: form.values.city_id,
        address: form.values.address,
        phone: form.values.phone,
        photo: "",
      });

      if (response.status === 201) {
        const newUser = { ...user, active: true };
        Cookies.set("user", JSON.stringify(newUser));
        router.push("/dashboard/student");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    console.log(form.values);
  };

  return (
    <AppLayout role="mahasiswa" activeLink="profile">
      <Stack my={35} mx={45}>
        <Text c="black" size={32} fw={600} align="left">
          Isi Data Pribadi Anda
        </Text>
        <Box className={classes.form} py={20} px={30}>
          <ScrollArea
            h="calc(100vh - 225px)"
            pr={15}
            offsetScrollbars
            styles={(theme) => ({
              scrollbar: {
                "&, &:hover": {
                  background:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },

                '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                  backgroundColor: theme.colors.primary[5],
                },
              },

              corner: {
                opacity: 1,
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            })}
          >
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                disabled
                size="md"
                label="Nama Lengkap"
                {...form.getInputProps("name")}
              />

              <Space h={15} />

              <TextInput
                disabled
                size="md"
                label="NIM"
                {...form.getInputProps("nim")}
              />

              <Space h={15} />

              <TextInput
                disabled
                size="md"
                label="Angkatan"
                {...form.getInputProps("start_education_year")}
              />

              <Space h={15} />

              <Select
                disabled
                label="Jalur Masuk"
                data={entrancesData}
                {...form.getInputProps("entrance_code")}
              />

              <Space h={15} />

              <TextInput
                disabled
                size="md"
                label="Dosen Wali"
                {...form.getInputProps("lecture_name")}
              />

              <Space h={15} />

              <TextInput
                required
                size="md"
                label="Nomor Telepon"
                disabled={isLoading}
                {...form.getInputProps("phone")}
              />

              <Space h={15} />

              <TextInput
                required
                size="md"
                label="Email"
                disabled={isLoading}
                {...form.getInputProps("email")}
              />

              <Space h={15} />

              <PasswordInput
                required
                size="md"
                label="Password"
                disabled={isLoading}
                {...form.getInputProps("password")}
              />

              <Space h={15} />

              <Select
                required
                label="Jenis Kelamin"
                data={[
                  { value: "male", label: "Laki-laki" },
                  { value: "female", label: "Perempuan" },
                ]}
                disabled={isLoading}
                {...form.getInputProps("gender")}
              />

              <Space h={15} />

              <Select
                required
                searchable
                label="Provinsi"
                data={provincesData}
                disabled={isLoading}
                {...form.getInputProps("province_id")}
              />

              <Space h={15} />

              <Select
                required
                searchable
                label="Kabupaten / Kota"
                data={citiesData}
                disabled={isLoading}
                {...form.getInputProps("city_id")}
              />

              <Space h={15} />

              <Textarea
                required
                size="md"
                label="Alamat"
                disabled={isLoading}
                {...form.getInputProps("address")}
              />

              <Group mt="md">
                <Button
                  loading={isLoading}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </Group>
            </form>
          </ScrollArea>
        </Box>
      </Stack>
    </AppLayout>
  );
}
