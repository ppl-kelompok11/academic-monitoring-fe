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
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconCheck, IconX } from "@tabler/icons-react";
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

const Index = () => {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState("");
  const theme = useMantineTheme();

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

  const handleValidation = (id: number, status: string) => {
    try {
      const response = api.put(`pkl/validate`, {
        id: id,
        verification_status: status,
      });
      console.log(response);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (path: string) => {
    return () => {
      setPath(path);
      open();
    };
  };

  const rows = data.map((row: any) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.nim}</td>
      <td>{row.pkl_status}</td>
      <td>{row.grade}</td>
      <td>
        <Button onClick={handleView(row.scan_pkl.url)}>Lihat Berkas</Button>
      </td>
      <td>
        {
          <Flex gap="xs">
            <ActionIcon
              variant="filled"
              color="green"
              onClick={() => {
                handleValidation(row.id, "02");
              }}
            >
              <IconCheck size="1rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => {
                handleValidation(row.id, "00");
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
      <Modal
        opened={opened}
        onClose={close}
        title="Berkas Berita Acara PKL"
        size="90%"
        centered
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <iframe src={path} width="100%" height="720px" />
      </Modal>

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
            <Grid.Col md={3} xs={12}></Grid.Col>
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

export default Index;
