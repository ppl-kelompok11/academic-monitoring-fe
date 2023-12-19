import React, { useEffect, useState } from "react";
import {
  Stack,
  Text,
  createStyles,
  Box,
  Group,
  Button,
  Space,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import AppLayout from "@/layouts/AppLayout";
import FileUpload from "@/components/molekul/FileUpload";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import moment from "moment";

const UseStyles = createStyles((theme) => ({
  wrapper: {},
  form: {
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  title: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "60px",
    },
  },
  addMahasiswaFormLayout: {
    [theme.fn.smallerThan("md")]: {
      width: "300px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Index() {
  const { classes } = UseStyles();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      semester_value: "",
      grade: "",
      defence_date: "",
      scan_skripsi: {
        path: "",
        filename: "",
        url: "",
      },
    },
  });
  const [semester, setSemester] = React.useState([]);
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id);
      showDetail(router.query.id);
    }
  }, [router.isReady]);

  const showDetail = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/skripsi/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        const newData = {
          ...response.data,
          defence_date: new Date ("2023-12-01"),
        }
        form.setValues(newData);
        console.log("ini form", form.values);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await api.put("/skripsi", {
        id: router.query.id,
        semester_value: form.values.semester_value,
        grade: form.values.grade,
        scan_skripsi: form.values.scan_skripsi.path,
      });

      if (response.status === 200) {
        router.push("/academic/skripsi");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    console.log(form.values);
  };
  const handleUpload = (file: any) => {
    form.setFieldValue("scan_irs", file);
    console.log(form.values);
  };

  const getSemester = async () => {
    try {
      const response = await api.get("/semester/lookup");
      setSemester(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSemester();
  }, []);

  const semesterData = semester.map((data: any) => ({
    value: data.value,
    label: data.value,
  }));

  const gradeData = [
    {
      value: "4.00",
      label: "A",
    },
    {
      value: "3.00",
      label: "B",
    },
    {
      value: "2.00",
      label: "C",
    },
    {
      value: "1.00",
      label: "D",
    },
    {
      value: "0.00",
      label: "E",
    },
  ];

  return (
    <AppLayout activeLink="academic">
      <div className={classes.wrapper}>
        <Stack mx={45}>
          <TitleWithBack title="Edit Skripsi" route="/academic/skripsi/" />
          <Box className={classes.form} py={15} px={20}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
              <Select
                label="Semester"
                data={semesterData}
                {...form.getInputProps("semester_value")}
              />
              <Space h={15} />
              <Select
                label="Nilai Skripsi"
                data={gradeData}
                {...form.getInputProps("grade")}
              />
              <Space h={15} />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Tanggal Sidang Skripsi"
                disabled={isLoading}
                {...form.getInputProps("defence_date")}
              />
              <Space h={15} />
              <Text c="primary" size={18} fw={500} align="left" mb={5}>
                Scan Berita Acara Skripsi
              </Text>
              <FileUpload
                file={form.values.scan_skripsi}
                onFileUpload={handleUpload}
              />
              <Group mt="md">
                <Button type="submit" onClick={handleSubmit}>
                  Simpan
                </Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </div>
    </AppLayout>
  );
}
