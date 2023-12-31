import { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Stack,
  Tabs,
  Space,
  Text,
  Center,
  Modal,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import IrsPanel from "@/components/molekul/ProgressTabPanel/IrsPanel";
import KhsPanel from "@/components/molekul/ProgressTabPanel/KhsPanel";
import PklPanel from "@/components/molekul/ProgressTabPanel/PklPanel";
import SkripsiPanel from "@/components/molekul/ProgressTabPanel/SkripsiPanel";
import ProgressAkademik from "@/components/molekul/ProgressAkademik";
import ProfilMahasiswa from "@/components/molekul/ProfilMahasiswa";

const Index = () => {
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);
  const [opened, { open, close }] = useDisclosure(false);
  const [openCollapse, { toggle }] = useDisclosure(false);

  const [mahasiswa, setMahasiswa] = useState<any>({});
  const [isLoadingMahasiswa, setIsLoadingMahasiswa] = useState(false);
  const [riwayat, setRiwayat] = useState<any>([]);
  const [isLoadingRiwayat, setIsLoadingRiwayat] = useState(false);
  const [semester, setSemester] = useState<any>(null);

  const [irsId, setIrsId] = useState<any>(null);
  const [irs, setIrs] = useState<any>({});
  const [isLoadingIrs, setIsLoadingIrs] = useState(false);

  const [khsId, setKhsId] = useState<any>(null);
  const [khs, setKhs] = useState<any>({});
  const [isLoadingKhs, setIsLoadingKhs] = useState(false);

  const [pklId, setPklId] = useState<any>(null);
  const [pkl, setPkl] = useState<any>({});
  const [isLoadingPkl, setIsLoadingPkl] = useState(false);

  const [skripsi, setSkripsi] = useState<any>({});
  const [skripsiId, setSkripsiId] = useState<any>(null);
  const [isLoadingSkripsi, setIsLoadingSkripsi] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    getMahasiswa(user.ref_id);
    getRiwayat(user.ref_id);
  }, []);

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
      setIsLoadingMahasiswa(true);
      const response = await api.get(`/students/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setMahasiswa(response.data);
        setIsLoadingMahasiswa(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingMahasiswa(false);
    }
  };

  const getRiwayat = async (id: any) => {
    try {
      setIsLoadingRiwayat(true);
      const response = await api.get(`/students/academic/${id}`);
      if (response.status === 200) {
        console.log("riwayat", response.data.data);
        setRiwayat(response.data.data);
        setIsLoadingRiwayat(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingRiwayat(false);
    }
  };

  const getIrs = async (id: any) => {
    try {
      setIsLoadingIrs(true);
      const response = await api.get(`/irs/${id}`);
      if (response.status === 200) {
        console.log("IRS", response.data);
        setIrs(response.data);
        setPath(response.data.scan_irs.url);
        setIsLoadingIrs(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingIrs(false);
    }
  };

  const getKhs = async (id: any) => {
    try {
      setIsLoadingKhs(true);
      const response = await api.get(`/khs/${id}`);
      if (response.status === 200) {
        console.log("KHS", response.data);
        setKhs(response.data);
        setPath(response.data.scan_khs.url);
        setIsLoadingKhs(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingKhs(false);
    }
  };

  const getPkl = async (id: any) => {
    try {
      setIsLoadingPkl(true);
      const response = await api.get(`/pkl/${id}`);
      if (response.status === 200) {
        console.log("PKL", response.data);
        setKhs(response.data);
        setPath(response.data.scan_pkl.url);
        setIsLoadingPkl(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingPkl(false);
    }
  };

  const getSkripsi = async (id: any) => {
    try {
      setIsLoadingSkripsi(true);
      const response = await api.get(`/skripsi/${id}`);
      if (response.status === 200) {
        console.log("Skripsi", response.data);
        setSkripsi(response.data);
        setPath(response.data.scan_skripsi.url);
        setIsLoadingSkripsi(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingSkripsi(false);
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
    <AppLayout activeLink="profile">
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
              isLoading={isLoadingIrs}
            />
          </Tabs.Panel>

          <Tabs.Panel value="khs">
            <KhsPanel
              khs={khs}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
              isLoading={isLoadingKhs}
            />
          </Tabs.Panel>

          <Tabs.Panel value="pkl">
            <PklPanel
              pkl={pkl}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
              isLoading={isLoadingPkl}
            />
          </Tabs.Panel>

          <Tabs.Panel value="skripsi">
            <SkripsiPanel
              skripsi={skripsi}
              openCollapse={openCollapse}
              onViewDetail={onViewDetail}
              path={path}
              isLoading={isLoadingSkripsi}
            />
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Stack mt={35} mx={45}>
        <TitleWithBack title="Profile" route="/dashboard/student" />
        <ProfilMahasiswa
          mahasiswa={mahasiswa}
          isLoading={isLoadingMahasiswa}
          isShowEditBtn
        />
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
            {isLoadingRiwayat ? (
              <Loader />
            ) : (
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
            )}
          </Center>
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default Index;
