import React, { useState, useEffect } from "react";
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
  Select,
  Center,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import AppLayout from "@/layouts/AppLayout";
import ImageUpload from "@/components/molekul/Imageupload";
import moment from "moment";

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
  const [lecture, setLecture] = React.useState<any>({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      nip: "",
      nidn: "",
      province_id: "",
      city_id: "",
      photo: {
        path: "",
        filename: "",
        url: "",
      },
      address: "",
      phone: "",
      email: "",
      province_name: "",
      city_name: "",
      work_start_date: "",
    },
  });

  const getDoswal = async (id: any) => {
    try {
      setIsFetching(true);
      const response = await api.get(`/lecture/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setLecture(response.data);
        form.setValues(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
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

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id);
      getDoswal(router.query.id);
      getProvinces();
    }
  }, [router.isReady]);

  useEffect(() => {
    getCities();
  }, [form.values.province_id]);

  const provincesData = provinces.map((data: any) => ({
    value: data.id,
    label: data.province_name,
  }));

  const citiesData = cities.map((data: any) => ({
    value: data.id,
    label: data.city_name,
  }));

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      setIsLoading(true);
      const response = await api.put("/lecture", {
        id: router.query.id,
        name: form.values.name,
        nip: form.values.nip,
        nidn: form.values.nidn,
        email: form.values.email,
        province_id: form.values.province_id,
        city_id: form.values.city_id,
        address: form.values.address,
        photo: form.values?.photo?.path,
        phone: form.values.phone,
        work_start_date: moment(form.values.work_start_date).format(
          "YYYY-MM-DD"
        ),
      });
      console.log(response);

      if (response.status === 201) {
        router.push(`/accounts/lecture/${router.query.id}`);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    console.log(form.values);
  };

  const handleUpload = (file: any) => {
    form.setFieldValue("photo", file);
    console.log(form.values);
  };

  return (
    <AppLayout activeLink="profile">
      <Stack my={35} mx={45}>
        <TitleWithBack
          title="Update Profile"
          route={`/accounts/lecture/${router.query.id}`}
        />
        <Box className={classes.form} py={20} pl={30} pr={15}>
          {isFetching ? (
            <Center>
              <Loader />
            </Center>
          ) : (
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
                  label="NIP"
                  {...form.getInputProps("nip")}
                />

                <Space h={15} />

                <TextInput
                  disabled
                  size="md"
                  label="NIDN"
                  {...form.getInputProps("nidn")}
                />

                <Space h={15} />

                <DateInput
                  required
                  withAsterisk={false}
                  valueFormat="YYYY-MM-DD"
                  label="Tanggal Mulai Bekerja"
                  {...form.getInputProps("work_start_date")}
                />

                <Space h={15} />

                <TextInput
                  required
                  withAsterisk={false}
                  size="md"
                  label="Email"
                  disabled={isLoading}
                  {...form.getInputProps("email")}
                />

                <Space h={15} />

                <TextInput
                  required
                  withAsterisk={false}
                  size="md"
                  label="Nomor Telepon"
                  disabled={isLoading}
                  {...form.getInputProps("phone")}
                />

                <Space h={15} />

                <Select
                  required
                  withAsterisk={false}
                  searchable
                  label="Provinsi"
                  data={provincesData}
                  disabled={isLoading}
                  {...form.getInputProps("province_id")}
                />

                <Space h={15} />

                <Select
                  required
                  withAsterisk={false}
                  searchable
                  label="Kabupaten / Kota"
                  data={citiesData}
                  disabled={isLoading}
                  {...form.getInputProps("city_id")}
                />

                <Space h={15} />

                <Textarea
                  required
                  withAsterisk={false}
                  size="md"
                  label="Alamat"
                  disabled={isLoading}
                  {...form.getInputProps("address")}
                />

                <Space h={15} />

                <Text c="primary" size={18} fw={500} align="left" mb={5}>
                  Foto Profil
                </Text>
                <ImageUpload
                  file={form.values.photo}
                  onFileUpload={handleUpload}
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
          )}
        </Box>
      </Stack>
    </AppLayout>
  );
}
