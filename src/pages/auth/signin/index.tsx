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
import axios from "axios";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    background:
      "linear-gradient(160deg, #56209C 0.58%, #130D55 33.33%, #000 91.92%)",
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
}));
import Cookies from "js-cookie";
const API = process.env.API_URL;
export default function Index() {
  const Router = useRouter();
  const { classes } = UseStyles();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async () => {
    // console.log(form.errors);
    form.validate();
    if (!form.validate().hasErrors) {
      try {
        const response = await api.post("/user/signin", {
          email: form.values.email,
          password: form.values.password,
        });
        if (response.data.token) {
          // console.log(response.data.token);
          Cookies.set("token", response.data.token);
          Cookies.set("user", JSON.stringify(response.data.user));
          Router.push("/dashboard/SelectionProcess1");
        }
        form.reset();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Grid>
          <Grid.Col sm={6} md={5} sx={{ width: "100%" }}>
            <Stack sx={{ height: "100vh" }} align="center" justify="center">
              <Box sx={{ width: "400px" }} className={classes.loginFormLayout}>
                <Text size={80} align="center" className={classes.title}>
                  Hi, There !
                </Text>
                <Text align="center">
                  Welcome To Future Leader Summit, lets join us
                </Text>
                <br />
                <TextInput
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  mt="md"
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <br />
                <Link href="forgot-password">
                  <Text
                    align="right"
                    sx={{
                      ":hover": {
                        fontWeight: 600,
                      },
                    }}
                  >
                    Forgot Password?
                  </Text>
                </Link>

                <br />
                <Button fullWidth onClick={handleSubmit}>
                  Sign In
                </Button>

                <br />
                <Text align="center">
                  Don’t have an account?
                  <Link href="signup">
                    <Text
                      sx={{
                        ":hover": {
                          fontWeight: 600,
                        },
                      }}
                      color="#6879C0"
                      span
                    >
                      {" "}
                      Sign Up
                    </Text>
                  </Link>
                </Text>
                <Link href="/">
                  <Text
                    sx={{
                      ":hover": {
                        fontWeight: 600,
                      },
                    }}
                    align="center"
                  >
                    Back To Home
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col
            sm={6}
            md={7}
            sx={{ width: "100%" }}
            className={classes.hiddenMobile}
          >
            <Image alt="auth" src="/AuthImage.png" height="100vh" />
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
