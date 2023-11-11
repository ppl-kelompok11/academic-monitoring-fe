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
} from "@mantine/core";
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

const Mahasiswa = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`pkl?search=${search}&page=${activePage}`);
      console.log(response.data.data);
      setData(response.data.data);
      setTotalPage(response.data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }, [search, activePage]);

  useEffect(() => {
    getData();
  }, [search, activePage]);

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`customers/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const rows = data.map((row: any) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.nim}</td>
      <td>{row.pkl_status}</td>
      <td>{row.grade}</td>
      <td>{row.scan_pkl}</td>
      <td>
        {
          <Flex gap="xs">
            <ActionIcon
              variant="filled"
              color="blue"
              onClick={() => {
                // router.push(`/academic/irs/${row.id}/edit`);
              }}
            >
              <IconInfoCircle size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="green"
              onClick={() => {
                // handleValidation(row.id);
              }}
            >
              <IconCheck size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => {
                // handleValidation(row.id);
              }}
            >
              <IconX size="1rem" />
            </ActionIcon>
          </Flex>
        }
      </td>
    </tr>
  ));

  return (
    <AppLayout role="dosen-wali" activeLink="validation">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Validasi" route="/dashboard/lecture" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="pkl"
            onTabChange={(value) => router.push(`/validation/${value}`)}
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
                  placeholder="Cari Data"
                  radius={8}
                  w={300}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }}
                />
              </Flex>
            </Grid.Col>
            <Grid.Col md={3} xs={12}>
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
                  <th>NIM</th>
                  <th>Status</th>
                  <th>Nilai</th>
                  <th>Scan Berita Acara PKL</th>
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
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default Mahasiswa;
