import React, { useEffect, useState } from "react";
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
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import FileUpload from "@/components/molekul/FileUpload";
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
    const [irs, setIrs] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const form = useForm({
        initialValues: {
            id: "",
            irs_id: "",
            sks: "",
            ip: "",
            scan_khs: {
                path: "",
                file: "",
                filename: "",
            },
        },
    });
    useEffect(() => {
        if (router.isReady) {
            showDetail(router.query.id);
            getIRS();
        }
    }, [router.isReady]);

    const showDetail = async (id: any) => {
        try {
            const response = await api.get(`/khs/${id}`);
            if (response.status === 200) {
                console.log("ini response", response.data);
                form.setValues({
                    id: response.data.id,
                    irs_id: response.data.irs_id,
                    sks: response.data.sks,
                    ip: response.data.ip,
                    scan_khs: response.data.scan_khs,
                });
                console.log("ini form", form.values);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getIRS = async () => {
        try {
            const response = await api.get("/irs");
            setIrs(response.data.data);
            setLoading(false);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const irsData = irs.map((data: any) => ({
        value: data.id,
        label: data.semester,
    }));

    const handleSubmit = async () => {
        try {
            const response = await api.put("/khs", {
                id: form.values.id,
                irs_id: form.values.irs_id,
                sks: form.values.sks,
                ip: form.values.ip,
                scan_khs: form.values.scan_khs?.path,
            });

            if (response.status === 200) {
                router.push("/academic/khs");
            }
        } catch (error) {
            console.log(error);
        }

        console.log(form.values);
    };

    const handleUpload = (file: any) => {
        form.setFieldValue("scan_khs", file);
        console.log(form.values);
    };

    return (
        <AppLayout activeLink="academic" role="mahasiswa">
            {!loading ? (
                <div className={classes.wrapper}>
                    <Stack mx={45}>
                        <TitleWithBack
                            title="Edit KHS"
                            route="/academic/khs/"
                        />
                        <Box className={classes.form} py={15} px={20}>
                            <form
                                onSubmit={form.onSubmit((values) =>
                                    console.log(values)
                                )}
                            >
                                <Select
                                    label="Semester"
                                    data={irsData}
                                    {...form.getInputProps("irs_id")}
                                />
                                <Space h={15} />
                                <TextInput
                                    size="md"
                                    label="SKS Semester"
                                    {...form.getInputProps("sks")}
                                />
                                <Space h={15} />
                                <TextInput
                                    size="md"
                                    label="IP Semester"
                                    {...form.getInputProps("ip")}
                                />
                                <Space h={15} />
                                <Text
                                    c="primary"
                                    size={18}
                                    fw={500}
                                    align="left"
                                    mb={5}
                                >
                                    Scan KHS
                                </Text>
                                <FileUpload
                                    file={form.values.scan_khs}
                                    onFileUpload={handleUpload}
                                />
                                <Group mt="md">
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Simpan
                                    </Button>
                                </Group>
                            </form>
                        </Box>
                    </Stack>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </AppLayout>
    );
}
