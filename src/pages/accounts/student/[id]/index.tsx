import { use, useEffect, useState } from "react";
import {
  Stack,
} from "@mantine/core";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import api from "@/configs/axios-interceptors";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import ProfilMahasiswa from "@/components/molekul/ProfilMahasiswa";

const Index = () => {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<any>({});
  const [isLoadingMahasiswa, setIsLoadingMahasiswa] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id);
      getMahasiswa(router.query.id);
    }
  }, [router.isReady]);

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
    }
  };

  return (
    <AppLayout role="operator" activeLink="accounts">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Detail Mahasiswa" route="/accounts/student" />
        <ProfilMahasiswa
          mahasiswa={mahasiswa}
          isLoading={isLoadingMahasiswa}
          isShowEditBtn
        />
      </Stack>
    </AppLayout>
  );
};

export default Index;
