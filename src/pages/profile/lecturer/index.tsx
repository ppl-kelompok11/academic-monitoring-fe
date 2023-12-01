import React, {useEffect} from "react";
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
  Skeleton
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import api from "@/configs/axios-interceptors";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import Cookies from "js-cookie";

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
  const [lecture, setLecture] = React.useState<any>({});
  const form = useForm({
    initialValues: {
      nama: "",
      email: "",
      provinsi: "",
      kabupatenKota: "",
      handphone: "",
    },
  });

  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const getLecture = async (id: any) => {
    try {
      const response = await api.get(`/lecture/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setLecture(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect (() => {
    getLecture(user.ref_id);
  }, [])

  return (
    <AppLayout activeLink="profile" role="dosen-wali">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Profile" route="/dashboard/lecturer" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "sm", md: "lg" }}
            justify={{ base: "center", md: "space-between" }}
            align="flex-start"
            p={16}
          >
            <table>
              <tr>
                <td style={{ paddingRight: "50px" }}>Nama Lengkap</td>
                <td style={{ paddingRight: "25px" }}>:</td>
                <td>
                  {lecture.name ? (
                    lecture.name
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>NIP</td>
                <td>:</td>
                <td>
                  {lecture.nip ? (
                    lecture.nip
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>NIDN</td>
                <td>:</td>
                <td>
                  {lecture.nidn ? (
                    lecture.nidn
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>Provinsi</td>
                <td>:</td>
                <td>
                  {lecture.province_name ? (
                    lecture.province_name
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>Kabupaten / Kota</td>
                <td>:</td>
                <td>
                  {lecture.city_name ? (
                    lecture.city_name
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>
                  {lecture.address ? (
                    lecture.address
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
              <tr>
                <td>No Handphone</td>
                <td>:</td>
                <td>
                  {lecture.phone ? (
                    lecture.phone
                  ) : (
                    <Skeleton width={50} height={10} radius="xl" />
                  )}
                </td>
              </tr>
            </table>
            <Center>
              <Image
                alt="auth"
                radius={16}
                src="/profile-sample.png"
                height={300}
                width={300}
                className=""
              />
            </Center>
          </Flex>
        </Card>

        {/* <Card mt={10} bg={"white"} radius={"lg"}>
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
        </Card> */}
      </Stack>
    </AppLayout>
  );
}
