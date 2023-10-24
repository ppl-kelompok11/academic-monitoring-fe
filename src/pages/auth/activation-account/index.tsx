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
import { useEffect, useState } from "react";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    width: "100%",
    height: "100vh",
    background: "#EEF0F6",
  },
  title: {},
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
  const router = useRouter();
  //set use state to any
  const { isReady, query } = useRouter();
  const [token, setToken] = useState<any>();
  useEffect(() => {
    if (isReady) {
      setToken(query.token);
    }
  }, [isReady]);
  const form = useForm({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      return {
        password:
          values.password.length < 8
            ? "Password must include at least 8 characters"
            : null,
        confirm_password:
          !values.confirm_password ||
          values.confirm_password !== values.password
            ? "Password not match"
            : null,
      };
    },
  });
  const handleSubmit = async () => {
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.put("/user/reset-password", {
          password: form.values.password,
          token: token,
        });
        form.reset();
        router.push("/auth/login");
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
                <Text c="primary" fw={600} size={45} align="center" className={classes.title}>
                  Aktivasi Akun
                </Text>
                <Text c="black" fw={500} size={18} align="center">
                  Silahkan Buat Password untuk Menggunakan Akun Anda
                </Text>
                <br />
                <PasswordInput
                  size="lg"
                  radius={11}
                  label="New Password"
                  {...form.getInputProps("password")}
                />
                <br />
                <PasswordInput
                  size="lg"
                  radius={11}
                  label="Confirm Password"
                  {...form.getInputProps("confirm_password")}
                />
                <br />
                <Button variant="filled" size="lg" radius="md" fullWidth onClick={handleSubmit}>
                  Ganti Password
                </Button>
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
