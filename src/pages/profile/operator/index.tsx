import { useEffect, useState } from "react";
import { Stack } from "@mantine/core";
import AppLayout from "@/layouts/AppLayout";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import ProfilOperator from "@/components/molekul/ProfilOperator";

const Index = () => {
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const [operator, setOperator] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOperator(user.ref_id);
  }, []);

  const getOperator = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/admins/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setOperator(response.data);
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
        <ProfilOperator
          operator={operator}
          isLoading={isLoading}
          isShowEditBtn
        />
      </Stack>
    </AppLayout>
  );
};

export default Index;
