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
      const response = await api.get(
        `students?search=${search}&page=${activePage}`
      );
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
      <td>{row.email}</td>
      <td>{row.nim}</td>
      {/* <td>
        {row.active ? (
          <Badge color="green">Aktif</Badge>
        ) : (
          <Badge color="red">Tidak Aktif</Badge>
        )}
      </td> */}
      <td>
        {
          <Flex gap="xs">
            <ActionIcon
              variant="filled"
              color="blue"
              onClick={() => {
                router.push(`/mahasiswa/detail/${row.id}`);
              }}
            >
              <IconInfoCircle size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="yellow"
              onClick={() => {
                router.push(`/mahasiswa/update/${row.id}`);
              }}
            >
              <IconEditCircle size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        }
      </td>
    </tr>
  ));

  return (
    <AppLayout role="operator" activeLink="accounts">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Manajemen Akun" route="/dashboard/operator" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="student"
            onTabChange={(value) => router.push(`/accounts/${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab value="student">Mahasiswa</Tabs.Tab>
              <Tabs.Tab value="lecture">Dosen</Tabs.Tab>
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
              <Flex gap={16} justify={{ xs: "flex-start", md: "flex-end" }}>
                <Button
                  onClick={() => {
                    router.push("/accounts/student/create");
                  }}
                >
                  Tambah
                </Button>
                <Button
                  onClick={() => {
                    router.push("/accounts/student/import");
                  }}
                >
                  Import
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
                  {/* <th>Status</th> */}
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
