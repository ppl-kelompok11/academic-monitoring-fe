import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  Stack,
  Text,
  createStyles,
  Box,
  TextInput,
  Group,
  Button,
  Space,
  NativeSelect,
  Card,
  SimpleGrid,
  Center,
  Grid,
  Flex,
  Skeleton,
  LoadingOverlay,
  Loader,
  Select,
} from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { PiPlusBold } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdBookmarks } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoBarChart } from "react-icons/io5";
import { MdOutlineGrade } from "react-icons/md";
import Link from "next/link";
import NavButton from "@/components/atoms/NavButton";
import InfoCard from "@/components/atoms/InfoCard";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
  icon: {
    borderRadius: "13px",
    backgroundColor: "#333F73",
    color: "white",
    fontWeight: 600,
    fontSize: "32px",
    padding: "16px",
    height: "100%",
  },
}));

export default function Index() {
  const { classes } = useStyles();
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const [data, setData] = useState<any>({});
  const [riwayat, setRiwayat] = useState([]);
  const thisYear = new Date().getFullYear();
  const [angkatan, setAngkatan] = useState(thisYear.toString());
  const [isLoading, setIsLoading] = useState(false);

  const getDashboard = async (year: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/dashboard/lecture/student-overview?start_education_year=${year}`
      );
      if (response.status === 200) {
        console.log("ini response", response.data);
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentIRS = async (year: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `dashboard/lecture/student-irs?start_education_year=${year}`
      );
      if (response.status === 200) {
        console.log("ini response", response.data);
        setRiwayat(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const angkatanData = [];
  for (let i = thisYear; i >= thisYear - 5; i--) {
    angkatanData.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  const handleAngkatanChange = (e: any) => {
    setAngkatan(e.target.value);
  };

  useEffect(() => {
    getDashboard(angkatan);
    getStudentIRS(angkatan);
  }, []);

  let dataChart: any = [];

  riwayat.map((item: any) => {
    dataChart.push({
      semester: item.semester_value,
      IP: item.average_ip,
    });
  });

  return (
    <AppLayout activeLink="dashboard" role="dosen-wali">
      <Stack pt="3vh" px="3%" align="flex-start">
        {!isLoading && (
          <Group position="apart">
            <Text
              size={32}
              fw={600}
              align="left"
              underline
              className={classes.name}
            >
              {/* Halo {(mahasiswa.name.split(" ")[0] || "").toLowerCase()}! */}
              Halo Malik!
            </Text>
            <Select
              data={angkatanData}
              placeholder="Angkatan Mahasiswa"
              label="Pilih Angkatan"
              radius="lg"
              defaultValue={angkatanData[0].value}
              onChange={handleAngkatanChange}
            />
          </Group>
        )}

        <Space h={20} />
        {isLoading ? (
          <LoadingOverlay visible={isLoading} />
        ) : (
          <>
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: "xl", cols: 3, spacing: "md" },
                { maxWidth: "md", cols: 2, spacing: "md" },
                { maxWidth: "sm", cols: 1, spacing: "sm" },
                { maxWidth: "xs", cols: 1, spacing: "sm" },
              ]}
            >
              <InfoCard
                title="Total Mahasiswa"
                color="black"
                value={data.total_student + " Mahasiswa"}
                icon={<IoPersonSharp color="white" size={32} />}
              />
              <InfoCard
                title="Mahasiswa Lulus"
                color="black"
                value={data.total_graduate + " Mahasiswa"}
                icon={<FaUserGraduate color="white" size={32} />}
              />
              <InfoCard
                title="Lulus Cumlaude"
                color="black"
                value={data.total_graduate_cumlaude + " Mahasiswa"}
                icon={<MdOutlineGrade color="white" size={32} />}
              />
              <InfoCard
                title="Rerata Lulus"
                color="black"
                value={Math.floor(data.average_semester_graduate) + " Semester"}
                icon={<IoBarChart color="white" size={32} />}
              />
              <InfoCard
                title="Rerata SKSK"
                color="black"
                value={data.average_sks_graduate}
                icon={<IoBarChart color="white" size={32} />}
              />
              <InfoCard
                title="Rerata SKSK Lulus"
                color="black"
                value={data.average_sks_kumulatif_graduate}
                icon={<IoBarChart color="white" size={32} />}
              />
              <InfoCard
                title="Rerata IPK"
                color="black"
                value={data.average_ip_graduate}
                icon={<IoBarChart color="white" size={32} />}
              />
              <InfoCard
                title="Rerata IPK Lulus"
                color="black"
                value={data.average_ip_kumulatif_graduate}
                icon={<IoBarChart color="white" size={32} />}
              />
            </SimpleGrid>
            <Space h={20} />
            <Card shadow="sm" className={classes.card}>
              <Text align="center" fw={600} size={20}>
                Progress IP Semester Rata-Rata
              </Text>
              <LineChart
                width={1000}
                height={300}
                data={dataChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis dataKey="IP" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="IP" stroke="#8884d8" />
              </LineChart>
            </Card>
          </>
        )}
      </Stack>
    </AppLayout>
  );
}
