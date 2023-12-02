import React, { useEffect } from "react";
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
  Skeleton,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import api from "@/configs/axios-interceptors";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import Cookies from "js-cookie";
import Router from "next/router";

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
  const [isLoading, setIsLoading] = React.useState(false);
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
      setIsLoading(true);
      const response = await api.get(`/lecture/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setLecture(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLecture(user.ref_id);
  }, []);

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
            <Stack>
              <table>
                <tr>
                  <td style={{ paddingRight: "50px" }}>Nama Lengkap</td>
                  <td style={{ paddingRight: "25px" }}>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.name ? (
                      lecture.name
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>NIP</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.nip ? (
                      lecture.nip
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>NIDN</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.nidn ? (
                      lecture.nidn
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Provinsi</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.province_name ? (
                      lecture.province_name
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Kabupaten / Kota</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.city_name ? (
                      lecture.city_name
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.address ? (
                      lecture.address
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>No Handphone</td>
                  <td>:</td>
                  <td>
                    {isLoading ? (
                      <Skeleton width={50} height={10} radius="xl" />
                    ) : lecture.phone ? (
                      lecture.phone
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              </table>
              <Button
                onClick={() => {
                  Router.push("/profile/edit");
                }}
                size="sm"
              >
                Edit Profile
              </Button>
            </Stack>
            <Center>
              {isLoading ? (
                <Skeleton width={300} height={300} radius="xl" />
              ) : (
                <Image
                  alt="profile picture"
                  radius={16}
                  src={lecture.photo ? lecture.photo : "/sample-profile.jpg"}
                  height={300}
                  width={300}
                  className=""
                />
              )}
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
