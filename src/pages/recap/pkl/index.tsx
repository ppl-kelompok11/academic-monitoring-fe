import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Card,
  Grid,
  Text,
  Input,
  Flex,
  Button,
  ActionIcon,
  Badge,
  Pagination,
  Stack,
  Tabs,
  Space,
  Center,
  Group,
  Box,
  useMantineTheme,
  Modal,
  Collapse,
  Skeleton,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconInfoCircle,
  IconSearch,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import api from "@/configs/axios-interceptors";
import { useCallback } from "react";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import getConfig from "next/config";
import TitleWithBack from "@/components/atoms/TitleWithBack";
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

const Index = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [rekap, setRekap] = useState<any>([]);
  const [totalAngkatan, setTotalAngkatan] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [list, setList] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingRecap, setIsLoadingRecap] = useState(false);
  const theme = useMantineTheme();

  const getRekap = async () => {
    try {
      const response = await api.get(`recap/pkl`);
      console.log(response.data.data);
      const total = response.data.data.length;
      setRekap(response.data.data);
      setTotalAngkatan(total);
      console.log(totalAngkatan);
    } catch (error) {
      console.log(error);
    }
  };

  const getList = useCallback(
    async (status: any, angkatan: any) => {
      try {
        const response = await api.get(
          `students?pkl_status=${status}&start_education_year=${angkatan}&page=${activePage}`
        );
        console.log(response.data.data);
        setList(response.data.data);
        setTotalPage(response.data.meta.last_page);
        setIsLoadingList(false);
      } catch (error) {
        console.log(error);
      }
    },
    [activePage]
  );

  useEffect(() => {
    getRekap();
  }, []);

  useEffect(() => {
    if (status && angkatan) {
      getList(status, angkatan);
    }
  }, [status, angkatan, activePage]);

  const yearCol = rekap.map((col: any) => (
    <td key={col.start_education_year} colSpan={2}>
      {col.start_education_year}
    </td>
  ));

  const statusCol = rekap.map((col: any) => (
    <>
      <td key={col.start_education_year}>Sudah</td>
      <td key={col.start_education_year}>Belum</td>
    </>
  ));

  const countCol = rekap.map((col: any) => {
    const clickGraduate = () => {
      if (opened) {
        toggle();
        setStatus("");
        setAngkatan("");
      } else {
        setIsLoadingList(true);
        setStatus("graduate");
        setAngkatan(col.start_education_year.toString());
        toggle();
      }
    };

    const clickNotGraduate = () => {
      if (opened) {
        toggle();
        setStatus("");
        setAngkatan("");
      } else {
        setIsLoadingList(true);
        setStatus("not_graduate");
        setAngkatan(col.start_education_year.toString());
        toggle();
      }
    };

    return (
      <>
        <td key={col.start_education_year}>
          <Text onClick={clickGraduate}>{col.graduate}</Text>
        </td>
        <td key={col.start_education_year}>
          <Text onClick={clickNotGraduate}>{col.not_graduate}</Text>
        </td>
      </>
    );
  });

  const rows = list.map((row: any, index: number) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.nim}</td>
      <td>{row.name}</td>
      <td>{row.start_education_year}</td>
      <td>{row.grade ? row.grade : "-"}</td>
    </tr>
  ));

  return (
    <AppLayout role="dosen-wali" activeLink="validation">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Rekapitulasi" route="/dashboard/lecture" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="pkl"
            onTabChange={(value) => router.push(`/recap/${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab value="pkl">PKL</Tabs.Tab>
              <Tabs.Tab value="skripsi">Skripsi</Tabs.Tab>
              <Tabs.Tab value="status">Status</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Space h={15} />
          <ScrollArea
            mt={10}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table miw={700} withColumnBorders withBorder>
              <thead
                className={cx(classes.header, {
                  [classes.scrolled]: scrolled,
                })}
              >
                <tr>
                  <th
                    colSpan={totalAngkatan * 2}
                    style={{ textAlign: "center" }}
                  >
                    Angkatan
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {isLoadingRecap ? (
                  <Loader />
                ) : (
                  <>
                    <tr>{yearCol}</tr>
                    <tr>{statusCol}</tr>
                    <tr>{countCol}</tr>
                  </>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Card>
        <Collapse in={opened}>
          <Card mt={10} bg={"white"} radius={"lg"}>
            <Text align="center" fw={600} size={20}>
              Daftar {status == "graduate" ? "Sudah" : "Belum"} Lulus PKL
              Angkatan {angkatan} <br />
              Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP Semarang
            </Text>
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
                    <th>No</th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Angkatan</th>
                    <th>Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingList ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        <Loader />
                      </td>
                    </tr>
                  ) : list.length == 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Tidak Ada Mahasiswa
                      </td>
                    </tr>
                  ) : (
                    rows
                  )}
                </tbody>
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
          </Card>
        </Collapse>
      </Stack>
    </AppLayout>
  );
};

export default Index;
