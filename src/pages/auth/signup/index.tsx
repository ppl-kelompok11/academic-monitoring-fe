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
import { useForm } from "@mantine/form";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
export default function Index() {
  const Router = useRouter();
  const { classes } = UseStyles();
  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      return {
        fullname: !values.fullname ? "Fullname is required" : null,
        email:
          !values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
            ? "Invalid email"
            : null,
        password:
          values.password.length < 8
            ? "Password must include at least 8 characters"
            : null,
      };
    },
  });
  const handleSubmit = async () => {
    form.validate();
    if (form.values.email && form.values.password) {
      try {
        const response = await api.post("/user/signup", {
          fullname: form.values.fullname,
          email: form.values.email,
          password: form.values.password,
        });
        form.reset();
      } catch (error) {
        // console.error("Error:", error);
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
                  Hello
                </Text>
                <Text align="center">
                  Delegates, beforehand let’s register yourself first.
                </Text>
                <br />
                <TextInput
                  label="Fullname"
                  placeholder="Fullname"
                  {...form.getInputProps("fullname")}
                />
                <br />
                <TextInput
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <br />
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <br />
                <Button fullWidth onClick={handleSubmit}>
                  Sign Up
                </Button>
                <br />
                <Link href="signin">
                  <Text
                    sx={{
                      ":hover": {
                        fontWeight: 600,
                      },
                    }}
                    align="center"
                  >
                    Back To Sign In
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
