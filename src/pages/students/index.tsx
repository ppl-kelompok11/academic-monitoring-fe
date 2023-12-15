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
  ActionIcon,
  Pagination,
  Stack,
  Center,
  Loader,
} from "@mantine/core";
import { IconInfoCircle, IconSearch } from "@tabler/icons-react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import api from "@/configs/axios-interceptors";
import { useCallback } from "react";
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

const Index = () => {
  const router = useRouter();
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
      const response = await api.get(
        `students?search=${search}&page=${activePage}`
      );
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

  const parseEntrance = (code: string) => {
    if (code == "00") return "SNMPTN";
    if (code == "01") return "SBMPTN";
    if (code == "02") return "Mandiri";
    return "-";
  };

  const parseStatus = (status: string) => {
    if (status == "00") {
      return "Aktif";
    } else if (status == "01") {
      return "Cuti";
    } else if (status == "02") {
      return "Mangkir";
    } else if (status == "03") {
      return "Drop Out";
    } else if (status == "04") {
      return "Mengundurkan Diri";
    } else if (status == "05") {
      return "Lulus";
    } else if (status == "06") {
      return "Meninggal";
    }
  };

  const rows = data.map((row: any) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.nim}</td>
      <td>{row.start_education_year}</td>
      <td>{parseEntrance(row.entrance_code)}</td>
      <td>{parseStatus(row.status)}</td>
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
                router.push(`/students/${row.id}`);
              }}
            >
              <IconInfoCircle size="1rem" />
            </ActionIcon>
          </Flex>
        }
      </td>
    </tr>
  ));

  return (
    <AppLayout activeLink="student-list">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="List Mahasiswa" route="/dashboard/lecture" />
        <Card mt={10} bg={"white"} radius={"lg"}>
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
            <Grid.Col md={3} xs={12}></Grid.Col>
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
                    <th>Nama</th>
                    <th>Email</th>
                    <th>NIM</th>
                    <th>Angkatan</th>
                    <th>Jalur Masuk</th>
                    <th>Status Mahasiswa</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length == 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        Tidak Ada Mahasiswa
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

export default Index;
