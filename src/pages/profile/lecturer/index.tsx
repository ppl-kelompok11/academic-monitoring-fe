import { useEffect, useState } from "react";
import { Stack } from "@mantine/core";
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import ProfilDoswal from "@/components/molekul/ProfilDoswal";

const Index = () => {
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const [lecture, setLecture] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDoswal(user.ref_id);
  }, []);

  const getDoswal = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lecture/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setLecture(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout activeLink="profile">
      <Stack mt={35} mx={45}>
        <TitleWithBack title="Profile" route="/dashboard/" />
        <ProfilDoswal lecture={lecture} isLoading={isLoading} isShowEditBtn />
      </Stack>
    </AppLayout>
  );
};

export default Index;
