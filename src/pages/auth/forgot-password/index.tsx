import React, { use } from "react";
import {
  Flex,
  Grid,
  Stack,
  Text,
  createStyles,
  Image,
  TextInput,
  PasswordInput,
  Box,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    width: "100%",
    height: "100vh",
    background: "#EEF0F6",
  },
  loginFormLayout: {
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
    },
    validate: (values) => {
      return {
        email:
          !values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
            ? "Invalid email"
            : null,
      };
    },
  });
  const handleSubmit = async () => {
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.post("/user/forgot-password", {
          email: form.values.email,
        });
        form.reset();
      } catch (error) {}
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Grid>
          <Grid.Col sm={6} md={5} sx={{ width: "100%" }}>
            <Stack sx={{ height: "100vh" }} align="center" justify="center">
              <Box sx={{ width: "405px" }} className={classes.loginFormLayout}>
                <Text c="primary" fw={600} size={45} align="center">
                  Lupa Password
                </Text>
                <Text c="black" fw={500} size={18} align="center">
                  Masukkan Email Anda! <br />
                  Anda akan menerima email untuk mengganti password.
                </Text>
                <br />
                <TextInput
                  size="lg"
                  radius={11}
                  label="Email"
                  {...form.getInputProps("email")}
                />
                <br />
                <Button variant="filled" size="lg" radius="md" fullWidth onClick={handleSubmit}>
                  Kirim Permintaan
                </Button>
                <br />
                <Link href="signin">
                  <Text
                    c="primary"
                    size="md"
                    sx={{
                      ":hover": {
                        fontWeight: 500,
                      },
                    }}
                    align="center"
                  >
                    Kembali ke Sign In
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col
            sm={6}
            md={7}
            sx={{ width: "100%", height: "100vh" }}
            className={classes.hiddenMobile}
          >
            <Image alt="auth" src="/AuthImage.png" height="100vh" />
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
