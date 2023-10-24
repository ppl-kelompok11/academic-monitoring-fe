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
    background:
      "linear-gradient(160deg, #56209C 0.58%, #130D55 33.33%, #000 91.92%)",
    maxHeight: "700px",
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
              <Box sx={{ width: "400px" }} className={classes.loginFormLayout}>
                <Text size={40} align="center" className={classes.title}>
                  Reset Password
                </Text>
                <br />
                <Text align="center">
                  To reset your password, please enter your new password below.
                  Make sure its strong and unique.
                </Text>
                <br />
                <PasswordInput
                  label="New Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <br />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Password"
                  {...form.getInputProps("confirm_password")}
                />
                <br />
                <Button fullWidth onClick={handleSubmit}>
                  Reset
                </Button>
                <br />
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
