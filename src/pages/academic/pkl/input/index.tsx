import React from "react";
import {
    Stack,
    Text,
    createStyles,
    Box,
    TextInput,
    Group,
    Button,
    Space,
    Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import AppLayout from "@/layouts/AppLayout";
import FileUpload from "@/components/molekul/FileUpload";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import TitleWithBack from "@/components/atoms/TitleWithBack";

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
    const [semester, setSemester] = React.useState([]);
    const form = useForm({
        initialValues: {
            semester_value: "",
            grade: "",
            scan_pkl: {
                path: "",
                filename: "",
                ext: "",
                url: "",
            },
        },
    });

    const handleSubmit = async () => {
        try {
            const response = await api.post("/pkl", {
                semester_value: form.values.semester_value,
                grade: form.values.grade,
                scan_pkl: form.values.scan_pkl.path,
            });

            if (response.status === 200) {
                router.push("/academic/pkl");
            }
        } catch (error) {
            console.log(error);
        }

        console.log(form.values);
    };

    const handleUpload = (file: any) => {
        form.setFieldValue("scan_pkl", file);
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
            value: "4.0",
            label: "A",
        },
        {
            value: "3.0",
            label: "B",
        },
        {
            value: "2.0",
            label: "C",
        },
        {
            value: "1.0",
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
                    <TitleWithBack title="Input pkl" route="/academic/pkl/" />
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

                            <Select
                                label="Nilai pkl"
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
                                Scan Berita Acara pkl
                            </Text>
                            <FileUpload
                                file={form.values.scan_pkl}
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
