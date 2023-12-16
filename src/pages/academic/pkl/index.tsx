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
  Pagination,
  Stack,
  Tabs,
  Space,
  Center,
  Loader,
} from "@mantine/core";
import { IconEditCircle, IconSearch, IconTrash } from "@tabler/icons-react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import api from "@/configs/axios-interceptors";
import { useCallback } from "react";
import Cookies from "js-cookie";
import TitleWithBack from "@/components/atoms/TitleWithBack";

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

const Mahasiswa = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`pkl?search=${search}&page=${activePage}`);
      console.log(response.data.data);
      setData(response.data.data);
      setTotalPage(response.data.meta.last_page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [search, activePage]);

  useEffect(() => {
    getData();
  }, [search, activePage]);

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`pkl?id=${id}`);
      console.log(response.data.data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const rows = data.map((row: any) => (
    <tr key={row.id}>
      <td>{row.semester_value}</td>
      <td>{row.grade}</td>
      <td>
        {row.verification_status == "00"
          ? "Verifikasi Ditolak"
          : row.verification_status == "01"
          ? "Menunggu verifikasi"
          : "Sudah Diverifikasi"}
      </td>
      <td>
        <Button
          compact
          onClick={() => {
            window.open(row.scan_pkl.url);
          }}
        >
          Lihat File
        </Button>
      </td>
      <td>
        {
          <Flex gap="xs">
            <ActionIcon
              variant="filled"
              color="yellow"
              disabled={row.verification_status == "02"}
              onClick={() => {
                router.push(`/academic/pkl/${row.id}/edit`);
              }}
            >
              <IconEditCircle size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              disabled={row.verification_status == "02"}
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
    <AppLayout activeLink="academic">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Academic" route="/dashboard/mahasiswa" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="pkl"
            onTabChange={(value) => router.push(`/academic/${value}`)}
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
              {data.length == 0 && (
                <Flex justify={{ xs: "flex-start", md: "flex-end" }}>
                  <Button
                    onClick={() => {
                      router.push("/academic/pkl/input");
                    }}
                  >
                    Tambah
                  </Button>
                </Flex>
              )}
            </Grid.Col>
          </Grid>
          {isLoading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
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
                    <th>Semester</th>
                    <th>Nilai</th>
                    <th>Status</th>
                    <th>Scan Berita Acara PKL</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length == 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Tidak Ada Data PKL
                      </td>
                    </tr>
                  ) : (
                    rows
                  )}
                </tbody>
              </Table>
              {data.length != 0 && (
                <Center>
                  <Pagination
                    my={20}
                    value={activePage}
                    onChange={setPage}
                    total={totalPage}
                  />
                </Center>
              )}
            </ScrollArea>
          )}
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default Mahasiswa;
