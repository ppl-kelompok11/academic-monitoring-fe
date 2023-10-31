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
    NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const UseStyles = createStyles((theme) => ({
    wrapper: {
        background: "#FFFFFF",
    },
    form: {
        background: "#FFFFFF",
        borderRadius: "10px",
    },
    title: {
        [theme.fn.smallerThan("lg")]: {
            fontSize: "60px",
        },
    },
    bioMahasiswaFormLayout: {
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
    const form = useForm({
        initialValues: {
            email: "",
            nama: "",
            nim: "",
            alamat: "",
            kabupatenKota: "",
            provinsi: "",
            angkatan: "",
            jalurMasuk: "",
            handphone: "",
            status: "",
        },
    });

    return (
        <div>
            <Stack sx={{ height: "100vh" }} mt={35} mx={45}>
                <Text c="black" size={32} fw={600} align="left">
                    Isi Data Pribadi Anda
                </Text>
                <Box className={classes.form} py={15} px={20}>
                    <form
                        onSubmit={form.onSubmit((values) =>
                            console.log(values)
                        )}
                    >
                        <TextInput
                            size="md"
                            label="Email"
                            {...form.getInputProps("email")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Nama Lengkap"
                            {...form.getInputProps("nama")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="NIM"
                            {...form.getInputProps("nim")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="alamat"
                            {...form.getInputProps("alamat")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Kabupaten / Kota"
                            {...form.getInputProps("kabupatenKota")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Provinsi"
                            {...form.getInputProps("provinsi")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Angkatan"
                            {...form.getInputProps("angkatan")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Jalur Masuk"
                            {...form.getInputProps("jalurMasuk")}
                        />
                        <Space h={15} />
                        <TextInput
                            size="md"
                            label="Handphone"
                            {...form.getInputProps("handphone")}
                        />
                        <Space h={15} />
                        <NativeSelect
                            label="Status"
                            data={[
                                "Aktif",
                                "Cuti",
                                "Mangkir",
                                "Drop Out",
                                "Lulus",
                            ]}
                            {...form.getInputProps("status")}
                        />
                        <Group mt="md">
                            <Button type="submit">Simpan</Button>
                        </Group>
                    </form>
                </Box>
            </Stack>
            test
        </div>
    );
}
