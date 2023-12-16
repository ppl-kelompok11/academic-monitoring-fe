import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  Stack,
  Text,
  createStyles,
  Group,
  Space,
  Card,
  Center,
  Flex,
  LoadingOverlay,
} from "@mantine/core";
import { PiPlusBold } from "react-icons/pi";
import Link from "next/link";
import SimpleCard from "@/components/atoms/SimpleCard";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";

const useStyles = createStyles((theme) => ({
  name: {
    textUnderlineOffset: "15px",
  },
  card: {
    borderRadius: "14px",
  },
  gridCol: {
    maxWidth: "455px",
    marginRight: "20px",
  },
  addBtn: {
    borderRadius: "13px",
    backgroundColor: "#333F73",
    color: "white",
    fontWeight: 600,
    fontSize: "32px",
    padding: "5px",
    ":hover": {
      backgroundColor: "#333F73",
      borderRadius: "8px",
    },
  },
}));

export default function Index() {
  const { classes } = useStyles();
  const [user, setUser] = useState<any>({});
  const [totalMhs, setTotalMhs] = useState(0);
  const [totalDsn, setTotalDsn] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getTotalMahasiswa = async () => {
    try {
      const response = await api.get("/students");
      const total = response.data.data.length;
      setTotalMhs(total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getTotalDosenWali = async () => {
    try {
      const response = await api.get("/lecture");
      const total = response.data.data.length;
      setTotalDsn(total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userData = Cookies.get("user");
    userData && setUser(JSON.parse(userData));
    getTotalMahasiswa();
    getTotalDosenWali();
  }, []);

  return (
    <AppLayout activeLink="dashboard">
      {isLoading ? (
        <LoadingOverlay visible={isLoading} />
      ) : (
        <Stack pt="3vh" px="3%">
          <Text
            size={32}
            fw={600}
            align="left"
            underline
            className={classes.name}
          >
            Halo {user.name}!
          </Text>
          <Space h={20} />
          <Stack align="flex-start">
            <Group position="center">
              <SimpleCard
                title="Jumlah Mahasiswa"
                value={totalMhs.toString()}
              />
              <SimpleCard title="Jumlah Dosen" value={totalDsn.toString()} />
            </Group>
            <Group position="center">
              <Card w={450} className={classes.card}>
                <Flex px={12} justify="space-between" align="center">
                  <Text size={32} fw={600}>
                    Tambah <br /> Mahasiswa Baru
                  </Text>
                  <Link
                    href="/accounts/student/create"
                    className={classes.addBtn}
                  >
                    <Center>
                      <PiPlusBold size={45} />
                    </Center>
                  </Link>
                </Flex>
              </Card>
              <Card w={450} className={classes.card}>
                <Flex px={12} justify="space-between" align="center">
                  <Text size={32} fw={600}>
                    Tambah <br /> Dosen Baru
                  </Text>
                  <Link
                    href="/accounts/lecture/create"
                    className={classes.addBtn}
                  >
                    <Center>
                      <PiPlusBold size={45} />
                    </Center>
                  </Link>
                </Flex>
              </Card>
            </Group>
          </Stack>
        </Stack>
      )}
    </AppLayout>
  );
}
