import { use, useEffect, useState } from "react";
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
  Image,
  Tooltip,
  Modal,
  Collapse,
  Skeleton,
} from "@mantine/core";
import {
  IconEditCircle,
  IconInfoCircle,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/configs/axios-interceptors";
import { useCallback } from "react";
import Cookies from "js-cookie";
import getConfig from "next/config";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import { TextalignCenter } from "iconsax-react";
import IrsPanel from "@/components/molekul/ProgressTabPanel/IrsPanel";
import KhsPanel from "@/components/molekul/ProgressTabPanel/KhsPanel";
import PklPanel from "@/components/molekul/ProgressTabPanel/PklPanel";
import SkripsiPanel from "@/components/molekul/ProgressTabPanel/SkripsiPanel";
import ProgressAkademik from "@/components/molekul/ProgressAkademik";
import ProfilMahasiswaProgress from "@/components/molekul/ProfilMahasiswaProgress";
// const { publicRuntimeConfig } = getConfig();

const Mahasiswa = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [openCollapse, { toggle }] = useDisclosure(false);

  const [mahasiswa, setMahasiswa] = useState<any>({});
  const [riwayat, setRiwayat] = useState<any>([]);
  const [semester, setSemester] = useState<any>(null);
  const [irsId, setIrsId] = useState<any>(null);
  const [irs, setIrs] = useState<any>({});
  const [khsId, setKhsId] = useState<any>(null);
  const [khs, setKhs] = useState<any>({});
  const [pklId, setPklId] = useState<any>(null);
  const [pkl, setPkl] = useState<any>({});
  const [skripsi, setSkripsi] = useState<any>({});
  const [skripsiId, setSkripsiId] = useState<any>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id);
      getMahasiswa(router.query.id);
      getRiwayat(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (irsId) {
      getIrs(irsId);
    }
  }, [irsId]);

  useEffect(() => {
    if (khsId) {
      getKhs(khsId);
    }
  }, [khsId]);

  useEffect(() => {
    if (pklId) {
      getPkl(pklId);
    }
  }, [pklId]);

  useEffect(() => {
    if (skripsiId) {
      getSkripsi(skripsiId);
    }
  }, [skripsiId]);

  const getMahasiswa = async (id: any) => {
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

  const getIrs = async (id: any) => {
    try {
      const response = await api.get(`/irs/${id}`);
      if (response.status === 200) {
        console.log("IRS", response.data);
        setIrs(response.data);
        setPath(response.data.scan_irs.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKhs = async (id: any) => {
    try {
      const response = await api.get(`/khs/${id}`);
      if (response.status === 200) {
        console.log("KHS", response.data);
        setKhs(response.data);
        setPath(response.data.scan_khs.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPkl = async (id: any) => {
    try {
      const response = await api.get(`/pkl/${id}`);
      if (response.status === 200) {
        console.log("PKL", response.data);
        setKhs(response.data);
        setPath(response.data.scan_pkl.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSkripsi = async (id: any) => {
    try {
      const response = await api.get(`/skripsi/${id}`);
      if (response.status === 200) {
        console.log("Skripsi", response.data);
        setSkripsi(response.data);
        setPath(response.data.scan_skripsi.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    close();
    irs && setIrsId(null);
    khs && setKhsId(null);
    pkl && setPklId(null);
    skripsi && setSkripsiId(null);
    openCollapse && toggle();
  };

  const onViewDetail = (path: string) => {
    return () => {
      setPath(path);
      toggle();
    };
  };

  return (
    <AppLayout role="dosen-wali" activeLink="student-list">
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Progress Akademik Semester ${semester}`}
        size="70%"
        centered
      >
        <Tabs defaultValue="irs">
          <Tabs.List>
            {irsId && <Tabs.Tab value="irs">IRS</Tabs.Tab>}
            {khsId && <Tabs.Tab value="khs">KHS</Tabs.Tab>}
            {pklId && <Tabs.Tab value="pkl">PKL</Tabs.Tab>}
            {skripsiId && <Tabs.Tab value="skripsi">Skripsi</Tabs.Tab>}
          </Tabs.List>

          <Tabs.Panel value="irs">
            <IrsPanel
              irs={irs}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
            />
          </Tabs.Panel>

          <Tabs.Panel value="khs">
            <KhsPanel
              khs={khs}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
            />
          </Tabs.Panel>

          <Tabs.Panel value="pkl">
            <PklPanel
              pkl={pkl}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
            />
          </Tabs.Panel>

          <Tabs.Panel value="skripsi">
            <SkripsiPanel
              skripsi={skripsi}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
            />
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Stack mt={35} mx={45}>
        <TitleWithBack title="Detail Mahasiswa" route="/students" />
        <ProfilMahasiswaProgress mahasiswa={mahasiswa}/>
        <Space h={10} />
        <Text c="black" size={32} fw={700} align="left">
          Progress Akademik Mahasiswa
        </Text>
        <Card
          mt={10}
          bg={"white"}
          radius={"lg"}
          style={{ overflow: "visible" }}
        >
          <Center>
            <Flex
              gap="md"
              maw={800}
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <ProgressAkademik 
                riwayat={riwayat}
                irs={irs}
                khs={khs}
                pkl={pkl}
                skripsi={skripsi}
                setIrs={setIrs}
                setKhs={setKhs}
                setPkl={setPkl}
                setSkripsi={setSkripsi}
                setIrsId={setIrsId}
                setKhsId={setKhsId}
                setPklId={setPklId}
                setSkripsiId={setSkripsiId}
                setSemester={setSemester}
                open={open}
              />
            </Flex>
          </Center>
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default Mahasiswa;
