import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Card,
  Grid,
  Input,
  Flex,
  Button,
  ActionIcon,
  Badge,
  Pagination,
  Stack,
  Tabs,
  Space,
  Text,
  Center,
} from "@mantine/core";
import {
  IconEditCircle,
  IconInfoCircle,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/configs/axios-interceptors";
import { useCallback } from "react";
import Cookies from "js-cookie";
import getConfig from "next/config";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import { TextalignCenter } from "iconsax-react";
// const { publicRuntimeConfig } = getConfig();
const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

// type TableScrollAreaProps = NextPageWithAuth & {
//   data: {
//     id: number;
//     order_name: string;
//     customer_name: string;
//     instantion: string;
//     quantity: number;
//     total_price: number;
//   }[];
// };

const Mahasiswa = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [mahasiswa, setMahasiswa] = useState<any>({});
  const [riwayat, setRiwayat] = useState<any>([]);

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id);
      getData(router.query.id);
      getRiwayat(router.query.id);
    }
  }, [router.isReady]);

  const getData = async (id: any) => {
    try {
      const response = await api.get(`/students/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setMahasiswa(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRiwayat = async (id: any) => {
    try {
      const response = await api.get(`/students/academic/${id}`);
      if (response.status === 200) {
        console.log("riwayat", response.data.data);
        setRiwayat(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rows = riwayat.map((row: any) => (
    <tr key={row.semester_value}>
      <td>{row.semester_value}</td>
      <td>
        {row.irs_verification_status == "02" ? "IRS" : ""}{" "}
        {row.khs_verification_status == "02" ? "KHS" : ""}{" "}
        {row.pkl_verification_status == "02" ? "PKL" : ""}{" "}
        {row.skripsi_verification_status == "02" ? "Skripsi" : ""}
      </td>
    </tr>
  ));

  return (
    <AppLayout role="dosen-wali" activeLink="student-list">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Detail Mahasiswa" route="/student-list" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Grid justify="space-between">
            <Grid.Col span={8}>
              <table>
                <tr>
                  <td>Nama Lengkap</td>
                  <td>:</td>
                  <td>{mahasiswa.name}</td>
                </tr>
                <tr>
                  <td>NIM</td>
                  <td>:</td>
                  <td>{mahasiswa.nim}</td>
                </tr>
                <tr>
                  <td>Angkatan</td>
                  <td>:</td>
                  <td>{mahasiswa.start_education_year}</td>
                </tr>
                <tr>
                  <td>Dosen Wali</td>
                  <td>:</td>
                  <td>{mahasiswa.lecture_name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{mahasiswa.email}</td>
                </tr>
                <tr>
                  <td>Provinsi</td>
                  <td>:</td>
                  <td>{mahasiswa.province_name}</td>
                </tr>
                <tr>
                  <td>Kabupaten / Kota</td>
                  <td>:</td>
                  <td>{mahasiswa.city_name}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>{mahasiswa.address}</td>
                </tr>
                <tr>
                  <td>Nomor Telepon</td>
                  <td>:</td>
                  <td>{mahasiswa.phone}</td>
                </tr>
              </table>
            </Grid.Col>
            <Grid.Col span={4}></Grid.Col>
          </Grid>
        </Card>

        <Text c="black" size={32} fw={700} align="left">
          Riwayat Progress Akademik Mahasiswa
        </Text>

        <Card mt={10} bg={"white"} radius={"lg"}>
          <Table miw={700}>
            <thead
              className={cx(classes.header, {
                [classes.scrolled]: scrolled,
              })}
            >
              <tr>
                <th>Semester</th>
                <th>Dokumen Terverifikasi</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card>

        {/* <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="irs"
            onTabChange={(value) => router.push(`/accounts/${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab value="irs">IRS</Tabs.Tab>
              <Tabs.Tab value="khs">KHS</Tabs.Tab>
              <Tabs.Tab value="pkl">PKL</Tabs.Tab>
              <Tabs.Tab value="skripsi">Skripsi</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Space h={15} />
          <Grid justify="space-between">
            <Grid.Col md={9} xs={12}>
              <Flex gap="md">
                <Input
                  icon={<IconSearch />}
                  placeholder="Cari Mahasiswa"
                  radius={8}
                  w={300}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }}
                />
              </Flex>
            </Grid.Col>
            <Grid.Col md={3} xs={12}>
              <Flex justify={{ xs: "flex-start", md: "flex-end" }}>
                <Button
                  onClick={() => {
                    router.push("/accounts/student/create");
                  }}
                >
                  Tambah
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
          <ScrollArea
            mt={10}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table miw={700}>
              <thead
                className={cx(classes.header, {
                  [classes.scrolled]: scrolled,
                })}
              >
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>NIM</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Center>
              <Pagination
                my={20}
                value={activePage}
                onChange={setPage}
                total={totalPage}
              />
            </Center>
          </ScrollArea>
        </Card> */}
      </Stack>
    </AppLayout>
  );
};

export default Mahasiswa;
