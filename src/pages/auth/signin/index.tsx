import React, { useState } from "react";
import {
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
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "@/configs/axios-interceptors";
import Cookies from "js-cookie";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: "#EEF0F6",
  },
  title: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "60px",
    },
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
  imageAuth: {},
}));

export default function Index() {
  const Router = useRouter();
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.post("/auth/login", {
          email: form.values.email,
          password: form.values.password,
        });
        if (response.data.token) {
          // console.log(response.data.token);
          Cookies.set("token", response.data.token);
          Cookies.set("user", JSON.stringify(response.data.profile));
          Router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Grid mb={0}>
          <Grid.Col pb={0} sm={6} md={5} sx={{ width: "100%" }}>
            <Stack sx={{ height: "100vh" }} align="center" justify="center">
              <Box sx={{ width: "405px" }} className={classes.loginFormLayout}>
                <Text
                  c="primary"
                  fw={600}
                  size={45}
                  align="center"
                  className={classes.title}
                >
                  Selamat Datang !
                </Text>
                <Text c="black" fw={500} size={18} align="center">
                  Silahkan Masuk Untuk Memulai Sesi Anda
                </Text>
                <br />
                <TextInput
                  size="lg"
                  radius={11}
                  label="Email / NIM / NIP"
                  onKeyDownCapture={handleEnter}
                  disabled={isLoading}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  mt="md"
                  size="lg"
                  radius={11}
                  label="Password"
                  onKeyDownCapture={handleEnter}
                  disabled={isLoading}
                  {...form.getInputProps("password")}
                />
                <br />
                <Link href="forgot-password">
                  <Text
                    c="primary"
                    align="left"
                    sx={{
                      ":hover": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    Forgot Password?
                  </Text>
                </Link>

                <br />
                <Button
                  variant="filled"
                  size="lg"
                  radius="md"
                  fullWidth
                  onClick={handleSubmit}
                  loading={isLoading}
                >
                  Masuk
                </Button>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col
            pb={0}
            sm={6}
            md={7}
            sx={{ width: "100%" }}
            className={classes.hiddenMobile}
          >
            <Image
              alt="auth"
              src="/AuthImage.png"
              height="100vh"
              className=""
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
