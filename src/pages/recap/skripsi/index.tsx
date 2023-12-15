import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Card,
  Text,
  Button,
  Pagination,
  Stack,
  Tabs,
  Space,
  Center,
  Group,
  useMantineTheme,
  Collapse,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPrinter } from "@tabler/icons-react";
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

  statusRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.colors.gray[0],
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

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
  const [limit, setLimit] = useState(1);
  const theme = useMantineTheme();

  const getRekap = async () => {
    try {
      setIsLoadingRecap(true);
      const response = await api.get(`recap/skripsi`);
      console.log(response.data.data);
      const total = response.data.data.length;
      setRekap(response.data.data);
      setTotalAngkatan(total);
      setIsLoadingRecap(false);
      console.log(totalAngkatan);
    } catch (error) {
      console.log(error);
      setIsLoadingRecap(false);
    }
  };

  const getList = useCallback(
    async (status: any, angkatan: any) => {
      try {
        setIsLoadingList(true);
        const response = await api.get(
          `students?skripsi_status=${status}&start_education_year=${angkatan}&page=${activePage}&limit=${limit}`
        );
        console.log(response.data.data);
        setList(response.data.data);
        setTotalPage(response.data.meta.last_page);
        setPage(response.data.meta.current_page);
        setIsLoadingList(false);
      } catch (error) {
        console.log(error);
        setIsLoadingList(false);
      }
    },
    [activePage, limit]
  );

  useEffect(() => {
    getRekap();
  }, []);

  useEffect(() => {
    if (status && angkatan) {
      getList(status, angkatan);
    }
  }, [status, angkatan, activePage, limit]);

  const yearCol = rekap.map((col: any) => (
    <td key={col.start_education_year} colSpan={2}>
      {col.start_education_year}
    </td>
  ));

  const statusCol = rekap.map((col: any) => (
    <>
      <td key={col.start_education_year + col.graduate}>Sudah</td>
      <td key={col.start_education_year + col.not_graduate}>Belum</td>
    </>
  ));

  const countCol = rekap.map((col: any) => {
    const clickStatus = (status: string) => {
      return () => {
        if (!opened) {
          setStatus(status);
          setAngkatan(col.start_education_year.toString());
          if (status == "graduate") {
            setLimit(col.graduate);
          }
          if (status == "not_graduate") {
            setLimit(col.not_graduate);
          }
        }
        toggle();
      };
    };

    return (
      <>
        <td
          key={col.start_education_year}
          onClick={clickStatus("graduate")}
          className={classes.statusRow}
        >
          {col.graduate}
        </td>
        <td
          key={col.start_education_year}
          onClick={clickStatus("not_graduate")}
          className={classes.statusRow}
        >
          {col.not_graduate}
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

  const print = (id: string) => {
    let printContents: any = document.getElementById(id)?.innerHTML;
    let originalContents: any = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <AppLayout role="dosen-wali" activeLink="recap">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Rekapitulasi" route="/dashboard/lecture" />
        <Card mt={10} bg={"white"} radius={"lg"}>
          <Tabs
            color="primary"
            variant="pills"
            value="skripsi"
            onTabChange={(value) => router.push(`/recap/${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab value="pkl">PKL</Tabs.Tab>
              <Tabs.Tab value="skripsi">Skripsi</Tabs.Tab>
              <Tabs.Tab value="status">Status</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Space h={15} />
          {isLoadingRecap ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <ScrollArea
              mt={10}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Group position="right">
                <Button
                  variant="outline"
                  onClick={() => {
                    print("recap");
                  }}
                  leftIcon={<IconPrinter />}
                >
                  Cetak
                </Button>
              </Group>
              <Space h={15} />
              <div id="recap">
                <Text align="center" fw={600} size={20}>
                  Rekap Progress Skripsi Mahasiswa Informatika <br />
                  Fakultas Sains dan Matematika UNDIP Semarang
                </Text>
                <Space h={15} />
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
                    <tr>{yearCol}</tr>
                    <tr>{statusCol}</tr>
                    <tr>{countCol}</tr>
                  </tbody>
                </Table>
              </div>
            </ScrollArea>
          )}
        </Card>
        <Collapse in={opened}>
          <Card mt={10} bg={"white"} radius={"lg"}>
            <Group position="right">
              <Button
                variant="outline"
                onClick={() => {
                  print("recap_status");
                }}
                leftIcon={<IconPrinter />}
              >
                Cetak
              </Button>
            </Group>
            <Space h={15} />
            <ScrollArea
              mt={10}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <div id="recap_status">
                <Text align="center" fw={600} size={20}>
                  Daftar {status == "graduate" ? "Sudah" : "Belum"} Lulus
                  Skripsi Angkatan {angkatan} <br />
                  Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP
                  Semarang
                </Text>
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
              </div>
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
