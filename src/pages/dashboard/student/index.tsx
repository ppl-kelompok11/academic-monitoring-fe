import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  Stack,
  Text,
  createStyles,
  Card,
  SimpleGrid,
  LoadingOverlay,
} from "@mantine/core";
import { HiAcademicCap } from "react-icons/hi2";
import { useViewportSize } from "@mantine/hooks";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdBookmarks } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
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
  const [user, setUser] = useState<any>({});

  const [data, setData] = useState<any>({});
  const [khs, setKhs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { height, width } = useViewportSize();

  const getKhs = async () => {
    try {
      const response = await api.get(`/khs/`);
      if (response.status === 200) {
        console.log("KHS", response.data.data);
        setKhs(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`dashboard/students/profile-overview`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = Cookies.get("user");
    userData && setUser(JSON.parse(userData));
    getKhs();
    getDashboard();
  }, []);

  const parseStatusProgress = (status: string) => {
    if (status === "graduate") {
      return "Lulus";
    }
    if (status === "not_graduate") {
      return "Belum Ambil";
    }
  };

  const parseStatusMhs = (status: string) => {
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

  const colorStatusMhs = (status: string) => {
    if (status == "00") {
      return "green";
    } else if (status == "01") {
      return "yellow";
    } else if (status == "02") {
      return "red";
    } else if (status == "03") {
      return "red";
    } else if (status == "04") {
      return "grey";
    } else if (status == "05") {
      return "green";
    } else if (status == "06") {
      return "grey";
    }
  };

  let dataChart: any = [];

  khs.map((item: any) => {
    dataChart.push({
      semester: "Semester " + item.semester_value,
      IP: item.ip,
    });
  });

  return (
    <AppLayout activeLink="dashboard" role="mahasiswa">
      <Stack pt="3vh" px="3%" align="flex-start">
        {!isLoading && (
          <Text
            size={32}
            fw={600}
            align="left"
            underline
            className={classes.name}
          >
            Halo {user.name}!
          </Text>
        )}
        {isLoading ? (
          <LoadingOverlay visible={isLoading} />
        ) : (
          <>
            <SimpleGrid
              mt={20}
              cols={4}
              w="100%"
              spacing="lg"
              breakpoints={[
                { maxWidth: 1460, cols: 3, spacing: "md" },
                { maxWidth: 1110, cols: 2, spacing: "md" },
                { maxWidth: "sm", cols: 1, spacing: "sm" },
              ]}
            >
              <InfoCard
                title="Status Skripsi"
                color={data.skripsi_status === "graduate" ? "green" : "red"}
                value={parseStatusProgress(data.skripsi_status)}
                icon={<FaUserGraduate color="white" size={32} />}
              />
              <InfoCard
                title="Status PKL"
                color={data.pkl_status === "graduate" ? "green" : "red"}
                value={parseStatusProgress(data.pkl_status)}
                icon={<MdWork color="white" size={32} />}
              />
              <InfoCard
                title="Status Mahasiswa"
                color={colorStatusMhs(data.student_status)}
                value={parseStatusMhs(data.student_status)}
                icon={<IoMdInformationCircleOutline color="white" size={32} />}
              />
              <InfoCard
                title="Dosen Wali"
                color="black"
                value={data.lecture_name || "-"}
                icon={<IoPersonSharp color="white" size={32} />}
              />
              <InfoCard
                title="IPK"
                color="black"
                value={data.ip_kumulatif}
                icon={<HiAcademicCap color="white" size={32} />}
              />
              <InfoCard
                title="IP Semester"
                color="black"
                value={data.ip}
                icon={<HiAcademicCap color="white" size={32} />}
              />
              <InfoCard
                title="SKS Diambil"
                color="black"
                value={data.sks}
                icon={<IoMdBookmarks color="white" size={32} />}
              />
              <InfoCard
                title="SKS Kumulatif"
                color="black"
                value={data.sks_kumulatif}
                icon={<IoMdBookmarks color="white" size={32} />}
              />
            </SimpleGrid>
            <Card shadow="sm" w="100%" mt={10} className={classes.card}>
              <Text align="center" mb={10} fw={600} size={20}>
                Progress IP Semester
              </Text>
              {dataChart.length == 0 ? (
                <Text align="center" fw={400} size={16}>
                  Tidak ada data
                </Text>
              ) : (
                <LineChart
                  width={width * 0.9 - 100 * 0.9}
                  height={300}
                  data={dataChart}
                  margin={{
                    top: 5,
                    right: 50,
                    left: 0,
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
              )}
            </Card>
          </>
        )}
      </Stack>
    </AppLayout>
  );
}
