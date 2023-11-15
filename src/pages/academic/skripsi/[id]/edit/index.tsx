import React, { useEffect } from "react";
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
    Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import AppLayout from "@/layouts/AppLayout";
import { IoIosArrowBack } from "react-icons/io";
import next from "next";
import FileUpload from "@/components/molekul/FileUpload";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import { useCallback } from "react";

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
    const form = useForm({
        initialValues: {
            semester_value: "",
            grade: "",
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
            const response = await api.get(`/skripsi/${id}`);
            if (response.status === 200) {
                console.log("ini response", response.data);
                form.setValues({
                    semester_value: response.data.semester_value,
                    grade: response.data.grade,
                    scan_skripsi: response.data.scan_skripsi,
                });
                console.log("ini form", form.values);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post("/skripsi", {
                semester_value: form.values.semester_value,
                grade: form.values.grade,
                scan_skripsi: form.values.scan_skripsi.path,
            });

            if (response.status === 200) {
                router.push("/academic/skripsi");
            }
        } catch (error) {
            console.log(error);
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

    React.useEffect(() => {
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
            value: "0.0",
            label: "E",
        },
    ];

    return (
        <AppLayout activeLink="academic" role="mahasiswa">
            <div className={classes.wrapper}>
                <Stack mx={45}>
                    <Group spacing={5}>
                        <Box
                            component={Link}
                            href="/mahasiswa/dashboard"
                            display="flex"
                            style={{ textDecoration: "none" }}
                        >
                            <IoIosArrowBack size={32} />
                        </Box>
                        <Text c="black" size={32} fw={700} align="left">
                            Edit Skripsi
                        </Text>
                    </Group>
                    <Box className={classes.form} py={15} px={20}>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                console.log(values)
                            )}
                        >
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
                            <Text
                                c="primary"
                                size={18}
                                fw={500}
                                align="left"
                                mb={5}
                            >
                                Scan IRS
                            </Text>
                            <Text
                                c="primary"
                                size={18}
                                fw={500}
                                align="left"
                                mb={5}
                            >
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