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
    background:
      "linear-gradient(160deg, #56209C 0.58%, #130D55 33.33%, #000 91.92%)",
    maxHeight: "700px",
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
              <Box sx={{ width: "400px" }} className={classes.loginFormLayout}>
                <Text size={40} align="center">
                  Forgot Password
                </Text>
                <br />
                <Text align="center">
                  Please enter the email address associated with your account.
                  Well send you a link to reset your password.
                </Text>
                <br />
                <TextInput
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <br />
                <Button fullWidth onClick={handleSubmit}>
                  Send Link
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
