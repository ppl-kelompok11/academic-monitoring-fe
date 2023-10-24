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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/configs/axios-interceptors";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    width: "100%",
    height: "100vh",
    background:
      "linear-gradient(160deg, #56209C 0.58%, #130D55 33.33%, #000 91.92%)",
    maxHeight: "700px",
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
export default function Index() {
  const { classes } = UseStyles();
  const router = useRouter();
  //set use state to any
  const [token, setToken] = useState<any>();
  useEffect(() => {
    if (router.isReady) {
      setToken(router.query.token);
      // console.log(router.query.token);
    }
  }, [router.isReady]);
  const handleSubmit = async () => {
    try {
      const response = await api.put("/user/verify", {
        token: token,
      });
      router.push("/auth/signin");
    } catch (error) {}
  };
  return (
    <>
      <div className={classes.wrapper}>
        <Grid>
          <Grid.Col sm={6} md={5} sx={{ width: "100%" }}>
            <Stack sx={{ height: "100vh" }} align="center" justify="center">
              <Box sx={{ width: "400px" }} className={classes.loginFormLayout}>
                <Text size={40} align="center" className={classes.title}>
                  Verify Account
                </Text>
                <br />
                <Text align="center">
                  Please click verify button to activate your account
                </Text>
                <br />
                <Button fullWidth onClick={handleSubmit}>
                  Verify
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
